const express = require('express');
const { getAllBooks, createBook } = require("../controllers/bookController");
const router = express.Router();


router.get('/', getAllBooks)
router.post('/create', createBook)

module.exports = router