const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController')
const router = express.Router();


router.post('/create', createUser)
router.get('/list', getUsers)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router