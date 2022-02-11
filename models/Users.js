const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required!']
    },
    userid: {
        type: String,
        required: [true, 'User ID field is required!']
    },
    phone: {
        type: String,
        required: [true, 'Phone no. is required!']
    },
    password: {
        type: String,
        required: [true, 'User id required']
    },
    role: {
        type: String,
        required: [true, 'User id required']
    }
})

module.exports  = mongoose.model("User", User);