const express = require("express");
const router = express.Router();
const {
  createCollection,
  getCollectionById,
  getAllCollections,
  addBookToCollection,
  patchCollectionController,
  deleteCollectionController,
} = require("../controllers/collectioncontroller");

router.route("/").get(getAllCollections).post(createCollection);
router
  .route("/:id")
  .get(getCollectionById)
  .patch(patchCollectionController)
  .delete(deleteCollectionController);
router.patch("/add-book/:collectionId/:bookId", addBookToCollection);

module.exports = router;
