const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
	title: {
		type: String
	},
	type: {
		type: String
	},
	desc: {
		type: String
	},
	author: {
		type: String
	},
	identity: {
		type: String
	},
	date: {
		type: String,
		default: Date.now
	}
})

module.exports = profile = mongoose.model("profile", ProfileSchema)