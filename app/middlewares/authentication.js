const passport = require('passport');
const passportJWT = require('passport-jwt');

const User = require('../models/User');
const config = require('../../config.json');

const secretOrKey = config.secretOrKey;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWTOptions = {
	jwtFromRequest: ExtractJWT.fromAuthHeader(),
	passReqToCallback: true,
	secretOrKey: secretOrKey
};

let strategy = new JWTStrategy(JWTOptions, function (req, payload, next) {
	User.findOne({
		_id: payload.id
	}, function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return next(null, false, new Error('Invalid Credentials!'));
		}
		return next(null, user);
	});
});

let authMiddleware = function (req, res, next) {
	passport.authenticate('jwt', {
		session: false
	}, function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({
				message: info.toString()
			});
		}
		req.user = user;
		return next();
	})(req, res, next);
};

module.exports = {
	strategy,
	authMiddleware
};