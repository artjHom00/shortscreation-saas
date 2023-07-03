const { mongoose, Schema, Types } = require('mongoose');

const usersSchema = new Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    jwt_token: {
        required: false,
        type: String,
    },
    confirmation: {
        status: {
            required: true,
            type: Boolean,
            default: false
        },
        code: {
            required: false,
            type: Number
        },
    },
    registration_date: { 
        required: true,
        type: Date,
        default: Date.now
    },
    role: {
        required: true,
        type: String,
        default: 'user'
    },
    subscription: {
        has_subscription: {
            type: Boolean,
            required: true,
            default: false,
        },
        type: {
            type: String,
            required: false,
        },
        expires: {
            type: Date,
            required: false
        }
    },
    refferal: {
        type: Types.ObjectId,
        required: false,
    }
});

const User = mongoose.model('users', usersSchema);

module.exports = User