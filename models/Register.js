const mongoose = require('mongoose')

const Register = new mongoose.Schema({
    check_out_date: String,
    check_out_time: String,
    check_in_date: String,
    check_in_time: String,
    check_in_flag: Boolean,
    name:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    room_no:{
        type: String,
        required: true
    },
    place_reason: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("Register", Register)