let router = require('express').Router()
let { createUser, getUserById, getUsers, deleteUser, updateUser } = require('../controllers/apiController')

router.post('/', createUser)
router.get('/', getUsers)

router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)

module.exports = router