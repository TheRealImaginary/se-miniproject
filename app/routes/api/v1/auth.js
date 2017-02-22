const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../../models/User');

const router = express.Router();

router.use(bodyParser.json());

/**
 * User Sign Up
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