const mongoose = require('mongoose')

const PrefectAccount = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '#']
    },
    phone:  {
        type: String,
        required: [true, '#']
    },
    month:  {
        type: String,
        required: [true, '#']
    },
    accountList: Array
})

module.exports = new mongoose.model("PrefectAccount", PrefectAccount)