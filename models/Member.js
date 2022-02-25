const mongoose = require('mongoose')

const Member = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '#']
    },
    aadhar_no: {
        type: String,
        required: [true, '#']
    },
    age: {
        type: Number,
        required: [true, '#']
    },
    birth_place: {
        type: String,
        required: [true, '#']
    },
    veda: {
        type: String,
        required: true
    },
    gothra: {
        type: String,
        required: [true, '#']
    },
    father_name: {
        type: String,
        required: [true, '#']
    },
    husband_or_wife_name: String,
    home_address: {
        type: String,
        required: [true, '#']
    },
    city: {
        type: String,
        required: [true, '#']
    },
    state: {
        type: String,
        required: [true, '#']
    },
    pin: {
        type: String,
        required: [true, '#']
    },
    tel_no_office: String,
    tel_no_home: String,
    phone: {
        type: String,
        required: [true, '#']
    },
    permanent_address: {
        type: String,
        required: [true, '#']
    },
    p_city: {
        type: String,
        required: [true, '#']
    },
    p_state: {
        type: String,
        required: [true, '#']
    },
    p_pin: {
        type: String,
        required: [true, '#']
    },
    member_pic:{
        type: String,
        required: true
    },
    intro_name:{
        type: String,
        required: true
    },
    intro_phone:{
        type: String,
        required: true
    },
    intro_id:{
        type: String,
        required: true
    },
})

module.exports  = mongoose.model("Member", Member);