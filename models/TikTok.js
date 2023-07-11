
const { mongoose, Schema, Types } = require('mongoose');

const tiktoksSchema = new Schema({
    link: {
        required: true,
        type: String,
    },
    description: {
        required: false,
        type: String,
    },
    author: {
        required: true,
        type: String
    },
    is_used: {
        required: true,
        type: Boolean,
        default: false
    },
});

const Tiktok = mongoose.model('tiktoks', tiktoksSchema);

module.exports = Tiktok