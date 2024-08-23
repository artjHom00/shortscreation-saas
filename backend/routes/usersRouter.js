let router = require('express').Router()
let {
    confirmUser,
    authUser,
    getUsersShorts,
    getUsersAffiliates,
    resetPasswordUsingMail,
    resendConfirmationMail,
    getUserInfo,
    createUser,
    getUserById,
    getUsers,
    deleteUser,
    updateUser
} = require('../controllers/usersController')
let {
    authenticateToken
} = require('../providers/jwt')


router.post('/', createUser)
router.post('/auth', authUser)
router.post('/confirm', authenticateToken, confirmUser)
router.post('/resend', authenticateToken, resendConfirmationMail)
router.post('/forgot-password', resetPasswordUsingMail)

router.get('/', authenticateToken, getUsers)
router.get('/shorts', authenticateToken, getUsersShorts)
router.get('/affiliates', authenticateToken, getUsersAffiliates)
router.get('/me', authenticateToken, getUserInfo)
router.get('/:id', authenticateToken, getUserById)

router.delete('/:id', authenticateToken, deleteUser)
router.patch('/:id', authenticateToken, updateUser)

module.exports = router