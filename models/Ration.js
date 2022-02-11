const mongoose = require('mongoose')

const Ration = new mongoose.Schema({
    date: {
        type: String
    },
    rationList: Array,
    rationExp: Number
})

module.exports = mongoose.model("Ration", Ration)