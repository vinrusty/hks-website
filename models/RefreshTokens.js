const mongoose = require('mongoose')

const RefreshToken = new mongoose.Schema({
    refreshTokens: String
})

module.exports = new mongoose.model('RefreshToken', RefreshToken)