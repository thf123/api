const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tuserSchema = new Schema({
	name: {
		type:String,
		required: true
	},
	email: {
		type:String,
	},
	password: {
		type:String,
		required: true
	},
	avatar: {
		type:String
	},
	identity: {
		type:String
	},
	date: {
		type:Date,
		default: Date.now
	}
})

module.exports = tuser = mongoose.model("tuser",tuserSchema)