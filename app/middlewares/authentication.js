const passport = require('passport');
const passportJWT = require('passport-jwt');

const headerParser = require('../util/headerParser');
const User = require('../models/User');
const InvalidToken = require('../models/InvalidToken');
const config = require('../../config.json');

const SECRET_OR_KEY = config.SECRET_OR_KEY;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWTOptions = {
	jwtFromRequest: ExtractJWT.fromAuthHeader(),
	passReqToCallback: true,
	secretOrKey: SECRET_OR_KEY
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
		InvalidToken.findOne({
			token: headerParser(req.headers)
		}, function (err, token) {
			if (err) {
				return next(err);
			}
			if (token) {
				return next(null, false, new Error('Invalid Token'));
			}
			return next(null, user);
		});
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