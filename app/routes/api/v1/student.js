const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const CONSTANTS = require('../../../util/constants');
const User = require('../../../models/User');
const authentication = require('../../../middlewares/authentication');

const authMiddleware = authentication.authMiddleware;

const IMAGE_TYPES = CONSTANTS.IMAGE_TYPES;

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callBack) {
			return callBack(null, 'public/avatars/');
		},
		filename: function (req, file, callBack) {
			return callBack(null, `${req.user._id}.${file.mimetype.split('/')[1]}`);
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
 * Student Edit Profile Picture Route
 */
router.post('/profile/picture', authMiddleware, upload.single('avatar'), function (req, res, next) {
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
			message: 'Updated Profile Picture Successfully'
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