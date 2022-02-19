const mongoose = require('mongoose')

const PersonalDetail = new mongoose.Schema({
    // name: {
    //     type:String,
    //     required: true
    // },
    // phone:{
    //     type: String,
    //     required: true
    // },
    fathername: {
        type: String,
        required: [true, 'father name field is required!']
    },
    mothername: {
        type: String,
        required: [true, 'Name field is required!']
    },
    fphone: {
        type: String,
        required: [true, 'Phone no. is required!']
    },
    mphone: {
        type: String,
        required: [true, 'Phone no. is required!']
    },
    address: {
        type: String,
        required: [true, 'Phone no. is required!']
    },
    college: {
        type: String,
        required: [true, 'Phone no. is required!']
    },
    aadhar_no: {
        type: String,
        required: [true, '#']
    },
    room_no:{
        type: String,
        required: [true, '#']
    },
    studentImage: {
        type: String,
        required: true
    }
})

module.exports  = mongoose.model("PersonalDetail", PersonalDetail);