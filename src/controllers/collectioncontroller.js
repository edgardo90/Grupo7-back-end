const Collection = require('../model/collection');
const Book = require ('../model/book');

exports.createCollection = async (req, res) => {
  try {
    const { name, type, bookIds } = req.body;
    const collection = new Collection({ name, type, books: bookIds });
    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCollectionsByType = async (req, res) => {
  const { type } = req.params; 
  const collections = await Collection.find({ type }).populate('books');
  res.json(collections);
};