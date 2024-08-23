let {
    verifyCryptoCloudToken
} = require('../providers/jwt')
let Transaction = require('../models/Transaction')
let User = require('../models/User')


async function handleNotification(req, res) {
    try {
        let {
            status,
            invoice_id,
            amount_crypto,
            currency,
            order_id,
            token
        } = req.body

        let data = await verifyCryptoCloudToken(token).catch(() => {
            res.status(500).send('Error validating JWT Token')
        })

        console.log("🚀 ~ file: paymentsController.js:11 ~ verifyCryptoCloudToken ~ data:", data)

        let transaction = await Transaction.findOne({
            order_id
        })

        if (transaction) {
            transaction.status = 'paid';
            transaction.save();

            let user = await User.findById(transaction.user_id)

            if (user) {

                user.subscription = {
                    has_subscription: true,
                    type: transaction.type,
                    expires: new Date(Date.now() + 2629800000)
                }

                user.save()
                res.sendStatus(200)

            } else {
                res.status(500).send({
                    error: 'User not found'
                })
            }
        } else {
            res.status(500).send({
                error: 'Transaction not found'
            })
        }


    } catch (e) {
        res.status(500).send({
            error: 'Internal server error'
        })
    }
}

async function createTransaction(req, res) {
    try {
        const {
            user_id,
            type,
            order_id,
            amount
        } = req.body;

        // Validate input data
        if (!user_id || !type || !amount) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }

        const newTransaction = new Transaction({
            user_id,
            type,
            order_id,
            amount,
        });

        const savedTransaction = await newTransaction.save();

        res.status(201).json(savedTransaction);
    } catch (error) {
        console.log("🚀 ~ file: paymentsController.js:70 ~ createTransaction ~ error:", error)
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

module.exports = {
    handleNotification,
    createTransaction
}