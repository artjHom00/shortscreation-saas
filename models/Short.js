const { mongoose, Schema, Types } = require('mongoose');

const shortsSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId
    },
    youtube_account_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'YoutubeAccounts' // Reference the YoutubeAccount model
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

// Add a virtual property to populate the full Youtube account info
shortsSchema.virtual('youtube_account', {
    ref: 'YoutubeAccounts',
    localField: 'youtube_account_id',
    foreignField: 'id',
    justOne: true
});

const Short = mongoose.model('shorts', shortsSchema);

module.exports = Short;