let router = require('express').Router()
let { confirmUser, authUser, createUser, getUserById, getUsers, deleteUser, updateUser } = require('../controllers/usersController')
let { authenticateToken } = require('../services/jwt')

router.post('/', createUser)
router.post('/auth', authUser)
router.post('/confirm', confirmUser)
router.get('/', authenticateToken, getUsers)

router.get('/:id', authenticateToken, getUserById)
router.delete('/:id', authenticateToken, deleteUser)
router.patch('/:id', authenticateToken, updateUser)

module.exports = router