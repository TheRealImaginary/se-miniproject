const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const User = require('../../../models/User');
const authentication = require('../../../middlewares/authentication');

const authMiddleware = authentication.authMiddleware;

const imageTypes = ['jpeg', 'jpg', 'png'];

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callBack) {
			return callBack(null, 'public/avatars/');
		},
		filename: function (req, file, callBack) {
			return callBack(null, `${req.user.id}.${file.mimetype.split('/')[1]}`);
		}
	}),
	fileFilter: function (req, file, callBack) {
		if (imageTypes.includes(file.mimetype.split('/')[1]))
			return callBack(null, true);
		return callBack(new Error(`Invalid File Type. File type must be ${imageTypes.toString()}!`));
	}
});

const router = express.Router();

router.use(bodyParser.json());

router.post('/profile/picture', authMiddleware, upload.single('avatar'), function (req, res, next) {
	console.log(req.user);
	let fileName = req.file.filename;
	User.update({
		_id: req.user._id
	}, {
		profilePic: fileName
	}, function (err, rawResponse) {
		if (err) {
			return next(err);
		}
		//Front-End Updates Itself with photo
		return res.json({
			message: 'Done'
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