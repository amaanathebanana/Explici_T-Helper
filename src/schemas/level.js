const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const levelSchema = new Schema({
    user_id: String,
    xp: Number,
    level: Number,
    messages: Number
})

module.exports = mongoose.model('levels', levelSchema);
