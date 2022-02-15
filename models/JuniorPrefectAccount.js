const mongoose = require('mongoose')

const JuniorPrefectAccount = new mongoose.Schema({
    date: String,
    milk: {
        type: String,
        required: [true, '#']
    },
    milk_price: {
        type: String,
        required: [true, '#']
    },
    vegetable_list = Array
})

module.exports = new mongoose.model("JuniorPrefectAccount", JuniorPrefectAccount)