const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const CONSTANTS = require('../../../util/constants');
const Portfolio = require('../../../models/Portfolio');
const authentication = require('../../../middlewares/authentication');

const authMiddleware = authentication.authMiddleware;

const IMAGE_TYPES = CONSTANTS.IMAGE_TYPES;

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callBack) {
			return callBack(null, `public/portfolio/${req.user._id}`);
		},
		filename: function (req, file, callBack) {
			return callBack(null, `${file.fieldname}.${file.mimetype.split('/')[1]}`);
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
router.get('/portfolio/page/:page', function (req, res, next) {
	let page = req.params.page;
	Portfolio.count(function (err, count) {
		if (err) {
			return next(err);
		}
		Portfolio.find({}, {}, {
			skip: 10 * (page - 1),
			limit: 10
		}, function (err, results) {
			if (err) {
				return next(err);
			}
			return res.json({
				message: 'Done'
			});
		});
	});
});

/**
 * Student Upload Work
 */
router.post('/portfolio/new', authMiddleware, function (req, res, next) {});

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