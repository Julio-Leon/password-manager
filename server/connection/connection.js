MONGO_DB_STRING = 'mongodb+srv://julioleondiaz1:TXQocTaScaFgf80i@passwords.qytaomh.mongodb.net/'

const mongoose = require('mongoose')

mongoose.connect(MONGO_DB_STRING)

module.exports = mongoose