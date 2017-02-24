const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const ID_REGEX = /^[0-9]{2}-[0-9]{4,7}$/;
//http://stackoverflow.com/questions/19605150/regex-for-password-must-be-contain-at-least-8-characters-least-1-number-and-bot
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
//http://www.regexpal.com/94044
const GUC_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(student)\.guc.edu.eg$/

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (email) {
				return GUC_EMAIL_REGEX.test(email);
			},
			message: '{VALUE} is not a valid GUC email!'
		}
	},
	profilePic: {
		type: String,
	}
	guc_id: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (id) {
				return ID_REGEX.test(id);
			},
			message: '{VALUE} is not a valid GUC ID!'
		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (password) {
				return PASSWORD_REGEX.test(password);
			},
			message: 'Password must be atleast 8 characters long, including a digit and a special character!'
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

userSchema.pre('save', function (next) {
	let user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.hash(user.password, null, null, function (err, hashedPassword) {
		if (err) {
			return next(err);
		}
		user.password = hashedPassword;
		return next();
	});
});

userSchema.methods.checkPassword = function (guess, callBack) {
	bcrypt.compare(guess, this.password, function (err, isMatch) {
		if (err) {
			return callBack(err);
		}
		return callBack(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);