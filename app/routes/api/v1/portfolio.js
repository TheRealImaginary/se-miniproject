const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const CONSTANTS = require('../../../util/constants');
const Portfolio = require('../../../models/Portfolio');
const WorkItem = require('../../../models/WorkItem');
const authentication = require('../../../middlewares/authentication');

const authMiddleware = authentication.authMiddleware;

const IMAGE_TYPES = CONSTANTS.IMAGE_TYPES;

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callBack) {
			return callBack(null, `public/portfolio/`);
		},
		filename: function (req, file, callBack) {
			return callBack(null, `${req.user._id}_${Date.now()}.${file.mimetype.split('/')[1]}`);
		}
	}),
	fileFilter: function (req, file, callBack) {
		if (IMAGE_TYPES.includes(file.mimetype.split('/')[1]))
			return callBack(null, true);
		return callBack(new Error(`Invalid File Type. File type must be ${IMAGE_TYPES.toString()}!`));
	}
});

const router = express.Router();

router.use(bodyParser.json());

/**
 * Client View Portfolio
 */
router.get('/page/:page', function (req, res, next) {
	let page = req.params.page;
	Portfolio.count(function (err, count) {
		if (err) {
			return next(err);
		}
		Portfolio.find({}, {}, {
			skip: 10 * (page - 1),
			limit: 10
		}).populate('creator').populate('work').exec().then((portfolios) => {
			return res.json({
				count,
				portfolios
			});
		}).catch(console.err);
	});
});

/**
 * Student Upload Work (Create Portfolio)
 */
router.post('/new', authMiddleware, upload.single('portfolioImage'), function (req, res, next) {
	let portfolioImage = req.file;
	if (portfolioImage)
		portfolioImage = portfolioImage.filename;
	else
		portfolioImage = '';
	Portfolio.findOne({
		creator: req.user._id
	}, function (err, portfolio) {
		if (err) {
			return next(err);
		}
		if (portfolio) {
			return next('Already Have Portfolio. You can edit it');
		}
		let newPortfolio = new Portfolio({
			thumbnail: portfolioImage,
			creator: req.user._id
		});
		newPortfolio.save(function (err) {
			if (err) {
				return next(err);
			}
			return res.json({
				message: 'Successfully Created Portfolio!'
			});
		})
	});
});

/**
 * Student Upload Work
 */
router.put('/add', authMiddleware, upload.single('workImage'), function (req, res, next) {
	let workImage = req.file,
		workName = req.body.workName,
		workLink = req.body.workLink,
		workDescription = req.body.workDescription;
	if ((!workImage && !workLink) || !workName) {
		return next();
	}
	if (workImage)
		workImage = workImage.filename;
	else
		workImage = '';
	Portfolio.findOne({
		creator: req.user._id
	}, function (err, portfolio) {
		if (err) {
			return next(err);
		}
		if (!portfolio) {
			return next('No Portfolio Exists. Please create one first!');
		}
		let newWork = new WorkItem({
			name: workName,
			thumbnail: workImage,
			link: workLink,
			description: workDescription
		});
		newWork.save(function (err) {
			if (err) {
				return next(err);
			}
			portfolio.work.push(newWork._id);
			portfolio.save(function (err) {
				if (err) {
					return next(err);
				}
				return res.json({
					message: 'Successfully Added Work!'
				});
			});
		});
	});
});

/**
 * Error Handling Middleware
 */
router.use(function (err, req, res, next) {
	return res.status(500).json({
		error: err.toString()
	});
});

router.use(function (req, res, next) {
	return res.status(400).json({
		message: 'Invalid Or Missing Data'
	});
});

module.exports = router;