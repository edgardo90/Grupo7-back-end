const express = require('express');
const { createUser, getAllUsers, getUserById, patchUserById, deleteUser } = require('../controllers/userController')
const router = express.Router();

router.get('/', getAllUsers)
router.post('/create', createUser)
router.route('/find/:id').get(getUserById).patch(patchUserById).delete(deleteUser)

module.exports = router