const { mongoose, Schema, Types } = require('mongoose');

const shortsSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId
    },
    youtube_account_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    author: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String,
    },
    created_at: { 
        required: true,
        type: Date,
        default: Date.now
    },
});


const Short = mongoose.model('shorts', shortsSchema);

module.exports = Short;