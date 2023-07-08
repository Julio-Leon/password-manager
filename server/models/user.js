const mongoose = require('../connection/connection')
const Password = require('./password')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    passwordList: [Password]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel