const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const auth = require('./app/middlewares/authentication');
const config = require('./config.json');

const authApi = require('./app/routes/api/v1/auth');
const studentApi = require('./app/routes/api/v1/student');
const portfolioApi = require('./app/routes/api/v1/portfolio');

const app = express();

const PORT = process.env.PORT || config.PORT;
const DB_URL = config.DB_URL;

const connection = mongoose.connect(DB_URL);

app.use(express.static(`${__dirname}/public`));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, OPTIONS, GET, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// app.get('/*', function(req, res){
// 	return res.sendFile('index.html');
// });

app.options('/*', function (req, res) {
	return res.sendStatus(200);
});

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
 * Portfolio API Routes
 */
app.use('/api/v1/portfolio', portfolioApi);

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