const { mongoose, Schema } = require('mongoose');

const transactionsSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    type: {
        required: true,
        type: String,
    },
    amount: {
        required: true,
        type: Number,
    },
    date: { 
        required: true,
        type: Date,
        default: Date.now
    },
});

const Transaction = mongoose.model('transactions', transactionsSchema);

module.exports = Transaction