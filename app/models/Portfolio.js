const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
	thumbnail: {
		type: String
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true
	},
	work: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'WorkItem'
	}],
});

module.exports = mongoose.model('Portfolio', portfolioSchema);