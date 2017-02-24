const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const authentication = require('../../../middlewares/aithentication');
const authMiddleware = authentication.authMiddleware;

const router = express.Router();

router.use(bodyParser.json());

/**
 * Student Upload Work
 */
router.post('/portfolio/new', authMiddleware, function (req, res, next) {
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