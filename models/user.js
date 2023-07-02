const { mongoose, Schema, Types } = require('mongoose');

const usersSchema = new Schema({
    _id: {
        required: true,
        type: Types.ObjectId
    },
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
    confirmed: {
        required: true,
        type: Boolean,
        default: false
    },
    registration_date: { 
        required: true,
        type: Date,
        default: Date.now
    },
    refferal: {
        type: String,
        required: false,
    }
});

const user = mongoose.model('users', usersSchema);

module.exports = user