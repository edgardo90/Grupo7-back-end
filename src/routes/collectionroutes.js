const express = require('express');
const router = express.Router();
const { createCollection, getCollectionById, getAllCollections, addBookToCollection } = require('../controllers/collectioncontroller');

router.route('/').get(getAllCollections).post(createCollection);
// router.post('/', createCollection);
router.get('/:id', getCollectionById);
router.patch('/add-book/:collectionId/:bookId', addBookToCollection);

module.exports = router;