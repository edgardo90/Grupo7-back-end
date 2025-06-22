const express = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,
    patchUserById,
    deleteUser,
    loginUser,
} = require('../controllers/userController')
const router = express.Router();

router.get('/', getAllUsers)
router.post('/create', createUser)
router.route('/find/:id').get(getUserById).patch(patchUserById).delete(deleteUser)
router.post('/login', loginUser)

module.exports = router