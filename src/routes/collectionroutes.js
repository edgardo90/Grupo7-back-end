const express = require('express');
const router = express.Router();
const { createCollection, getCollectionById } = require('../controllers/collectioncontroller');

router.post('/', createCollection);
router.get('/:id', getCollectionById);

module.exports = router;