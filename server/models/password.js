const mongoose = require('../connection/connection')

const Schema = mongoose.Schema

const Password = new Schema({
    accountFor: {type: String, required: true},
    usernameUsed: {type: String, required: true},
    password: {type: String, required: true}
})

module.exports = Password