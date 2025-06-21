const express = require('express');
const router = express.Router();
const { createCollection, getCollectionById, getAllCollections, addBookToCollection } = require('../controllers/collectioncontroller');

router.post('/', createCollection);
router.get('/:id', getCollectionById);
router.get('/', getAllCollections)
router.put('/:collectionId/add-book/:bookId', addBookToCollection);

module.exports = router;