const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectioncontroller');

router.post('/', collectionController.createCollection);

router.get('/:type', collectionController.getCollectionsByType);

module.exports = router;