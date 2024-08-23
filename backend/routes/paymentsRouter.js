let router = require('express').Router()
let {
    handleNotification,
    createTransaction
} = require('../controllers/paymentsController.js')


router.post('/', handleNotification)
router.post('/create', createTransaction)

module.exports = router