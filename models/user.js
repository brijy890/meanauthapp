const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema
const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', UserSchema);
// Get UserById
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Get UserByName
module.exports.getUserByUsername = function(username, callback){
	const query = {username: username};
	User.findOne(query, callback);
}

// Create User
module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	}) ;
}