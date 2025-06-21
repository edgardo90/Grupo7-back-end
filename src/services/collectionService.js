const {
  createCollectionRepository,
  findCollectionByIdRepository,
  addBookToCollectionRepository,
  findAllCollectionsRepository
} = require('../repositories/collectionRepository');

const createCollectionService = async (name, type) => {
  if (!name || !type ) {
    const error = new Error("Nombre y tipo son requeridos");
    error.name = 400;
    throw error;
  }
  return await createCollectionRepository(name, type);
};

const getCollectionByIdService = async (id) => {
  const collection = await findCollectionByIdRepository(id);
  if (!collection) {
    const error = new Error("No se encontro la coleccion");
    error.name = 404;
    throw error;
  }
  return collection;
};

const addBookToCollectionService = async (collectionId, bookId) => {
  const updatedCollection = await addBookToCollectionRepository(collectionId, bookId);
  if (!updatedCollection) {
    const error = new Error("Colección o libro no encontrado");
    error.name = 404;
    throw error;
  }
  return updatedCollection;
};

const getAllCollectionsService = async () => {
  return await findAllCollectionsRepository();
};

module.exports = {
  createCollectionService,
  getCollectionByIdService,
  addBookToCollectionService,
  getAllCollectionsService
};