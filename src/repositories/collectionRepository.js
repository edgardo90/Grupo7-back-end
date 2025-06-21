const Collection = require('../model/collection');

const createCollectionRepository = async (name, type,  books = []) => {
  const newCollection = await Collection.create({ name, type, books });
  return newCollection;
};

const findCollectionByIdRepository = async (id) => {
  return await Collection.findById(id)
    .populate('books') // pobla los libros completos
    /*.populate( 'name email'); // pobla solo el email del creador*/
};

const addBookToCollectionRepository = async (collectionId, bookId) => {
  return await Collection.findByIdAndUpdate(
    collectionId,
    { $addToSet: { books: bookId } }, // para evitar los duplicados
    { new: true }
  ).populate('books');
};

const findAllCollectionsRepository = async () => {
  return await Collection.find()
    .populate('books')
    .populate( 'name');
};

module.exports = {
  createCollectionRepository,
  findCollectionByIdRepository,
  addBookToCollectionRepository,
  findAllCollectionsRepository
};