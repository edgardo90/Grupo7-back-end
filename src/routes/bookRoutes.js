const express = require('express');
const { getAllBooks, createBook,getBookById, patchBookById, deleteBookById } = require("../controllers/bookController");
const router = express.Router();


router.get('/', getAllBooks)
router.post('/create', createBook)
router.route('/find/:id').get(getBookById).patch(patchBookById).delete(deleteBookById)



module.exports = router