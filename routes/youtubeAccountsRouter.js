let router = require('express').Router()
let { addYoutubeAccount, getYoutubeAccounts, getYoutubeAccountById, updateYoutubeAccount, deleteYoutubeAccount } = require('../controllers/youtubeAccountsController')
let { authenticateToken } = require('../providers/jwt')


router.post('/', authenticateToken, addYoutubeAccount)

router.get('/', authenticateToken, getYoutubeAccounts)
router.get('/:id', authenticateToken, getYoutubeAccountById)

router.delete('/:id', authenticateToken, deleteYoutubeAccount)
router.patch('/:id', authenticateToken, updateYoutubeAccount)

module.exports = router