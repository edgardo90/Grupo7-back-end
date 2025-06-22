const {
  createCollectionRepository,
  findCollectionByIdRepository,
  addBookToCollectionRepository,
  findAllCollectionsRepository,
  editByIdCollectionRepository,
  deleteCollectionRepository,
} = require("../repositories/collectionRepository");
const { getUserByIdService } = require("../services/userService");

const createCollectionService = async (name, type, userId) => {
  const findUser = await getUserByIdService(userId);
  if (!findUser) {
    const error = new Error("No se encontro el usuario con ese Id");
    error.name = 404;
    throw error;
  }
  if (!name || !type) {
    const error = new Error("Nombre y tipo son requeridos");
    error.name = 400;
    throw error;
  }
  const newCollection = await createCollectionRepository(name, type);
  return { findUser, newCollection };
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
  const updatedCollection = await addBookToCollectionRepository(
    collectionId,
    bookId
  );
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

const deleteCollectionService = async (id) => {
  const deletedCollection = await deleteCollectionRepository(id);
  if (!deletedCollection) {
    const error = new Error(`Error! No se encontro el Collection  con el Id ${id}`);
    error.name = 404;
    throw error;
  }
  return deletedCollection;
};

const editByIdCollectionService = async (id, name , type) =>{
  const findCollection = await findCollectionByIdRepository(id);
    if (!findCollection) {
      const error = new Error(`Error! No se encontro el Collection  con el Id ${id}`);
      error.name = 404;
      throw error;
    }
    const updadateCollection = await editByIdCollectionRepository(id, name , type);
    return updadateCollection;
}

module.exports = {
  createCollectionService,
  getCollectionByIdService,
  addBookToCollectionService,
  getAllCollectionsService,
  deleteCollectionService,
  editByIdCollectionService
};
