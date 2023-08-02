const { mongoose, Schema } = require('mongoose');

const transactionsSchema = new Schema({
    user_id: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    status:{
        required: true,
        type: String,
        default: 'new'
    },
    order_id: {
        required: true,
        type: String
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