const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const User = require('../../../models/User');
const config = require('../../../../config.json');

const router = express.Router();
const secretOrKey = config.secretOrKey;

router.use(bodyParser.json());

/**
 * User Sign Up Route
 */
router.post('/signup', function (req, res, next) {
	let email = req.body.email,
		password = req.body.password,
		guc_id = req.body.guc_id,
		name = req.body.name;
	if (!email || !password || !guc_id || !name) {
		return next();
	}
	let user = new User({
		name: name,
		email: email,
		password: password,
		guc_id: guc_id
	});
	user.save(function (err) {
		if (err) {
			return next(err);
		}
		return res.json({
			message: 'Successfully Signed Up!'
		});
	});
});

/**
 * Student Login Route
 */
router.post('/login', function (req, res, next) {
	let email = req.body.email,
		password = req.body.password;
	if (!email || !password) {
		return next();
	}
	User.findOne({
		email: email
	}, function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next('Invalid Email');
		}
		user.checkPassword(password, function (err, isMatch) {
			if (err) {
				return next(err);
			}

			if (!isMatch) {
				return next('Invalid Password');
			}

			let token = jwt.sign({
				id: user._id
			}, secretOrKey, {
				expiresIn: '10d'
			});

			return res.json({
				message: 'Logged In Successfully',
				token: token
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