const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const warnSchema = new Schema({
    user_id: String,
    warnAmount: Number
})

module.exports = mongoose.model('warns', warnSchema);
