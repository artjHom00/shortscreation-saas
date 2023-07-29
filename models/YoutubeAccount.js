const { mongoose, Schema } = require('mongoose');

const YoutubeAccountsSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    credentials_valid: {
        required: false,
        type: Boolean
    },
    recovery_email: {
        required: false,
        type: String
    },
    tiktok_accounts: {
        required: true,
        type: Schema.Types.Mixed,
        default: []
    },
    background_video: {
        required: false,
        type: String,
    },
    last_upload: {
        required: true,
        type: Date,
        default: Date.now
    },
    settings: {
        description: {
            required: true,
            type: String,
            default: 'HERE DEFAULT DESCRIPTION'
        },
        title: {
            required: true,
            type: String,
            default: 'HERE DEFAULT TITLE'
        },
        pinnedComment: {
            required: true,
            type: String,
            default: 'HERE DEFAULT PINNED COMMENT'
        },
        // in hours
        uploadInterval: {
            required: true,
            type: Number,
            default: 24
        }
    }
});

const YoutubeAccount = mongoose.model('YoutubeAccounts', YoutubeAccountsSchema);

module.exports = YoutubeAccount