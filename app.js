const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const auth = require('./app/middlewares/authentication');
const config = require('./config.json');
const authApi = require('./app/routes/api/v1/auth');
const studentApi = require('./app/routes/api/v1/student');

const app = express();

const PORT = process.env.PORT || config.PORT;
const DB_URL = config.DB_URL;

const connection = mongoose.connect(DB_URL);

passport.use(auth.strategy);
app.use(passport.initialize());

/**
 * Authentication API Routes
 */
app.use('/api/v1/auth', authApi);

/**
 * Student API Routes
 */
app.use('/api/v1/student', studentApi);

/**
 * Error Handling Middlewares
 */
app.use(function (err, req, res, next) {
	return res.status(500).json({
		message: err.toString()
	});
});

app.use(function (req, res, next) {
	return res.status(400).json({
		message: 'Invalid Or Missing Data'
	});
});

app.listen(PORT, function () {
	console.log(`Server Listening On Port ${PORT}!`);
});