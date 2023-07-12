let router = require('express').Router()
let { confirmUser, authUser, getUsersShorts, getUserInfo, createUser, getUserById, getUsers, deleteUser, updateUser } = require('../controllers/usersController')
let { authenticateToken } = require('../providers/jwt')

router.post('/', createUser)
router.post('/auth', authUser)
router.post('/confirm', confirmUser)

router.get('/', authenticateToken, getUsers)
router.get('/shorts/:id', authenticateToken, getUsersShorts)
router.get('/me', authenticateToken, getUserInfo)
router.get('/:id', authenticateToken, getUserById)

router.delete('/:id', authenticateToken, deleteUser)
router.patch('/:id', authenticateToken, updateUser)

module.exports = router