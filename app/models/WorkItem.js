const mongoose = require('mongoose');

const workItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	thumbnail: {
		type: String
	},
	link: {
		type: String
	},
	description: {
		type: String
	}
});

module.exports = mongoose.model('WorkItem', workItemSchema);