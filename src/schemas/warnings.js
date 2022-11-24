const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const warningsSchema = new Schema({
    user_id: String,
    reason: String
})

module.exports = mongoose.model('warnings', warningsSchema);
