const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    Content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
}, { timestamps: true }
)

module.exports = mongoose.model('notes', noteSchema);