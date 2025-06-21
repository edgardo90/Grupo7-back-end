const logger = require('../config/logger');
const {
  createCollectionService,
  getCollectionByIdService,
  addBookToCollectionService,
  getAllCollectionsService
} = require('../services/collectionService');

const createCollection = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newCollection = await createCollectionService(name, type);
    logger.info(`Colección creada: ${newCollection._id}`);
    res.status(201).json(newCollection);
  } catch (error) {
    logger.error("Error al crear colección:", error);
    res.status(error.name || 500).json({ message: error.message });
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collection = await getCollectionByIdService(req.params.id);
    res.status(200).json(collection);
  } catch (error) {
    logger.error("Error al obtener colección:", error);
    res.status(error.name || 500).json({ message: error.message });
  }
};

const getAllCollections = async (req, res) => {
  try {
    logger.info("Utilizando getAllCollections para traer todas las colecciones");
    const collections = await getAllCollectionsService();
    return res.status(200).json({ status: 'success', message: 'Mostrando todas las colecciones', data: collections })
  } catch (error) {
    logger.error(" Error al traer todas las colecciones", error)
    return res.status(500).json({ status: "Error 500", message: error.message })
  }
}

const addBookToCollection = async (req, res) => {
  try {
      const { collectionId, bookId } = req.params;
      const updatedCollection = await addBookToCollectionService(collectionId, bookId)
      logger.info(`Libro ${bookId} agregado a la colleccion ${collectionId}`)
      return res.status(200).json({ status: 'success', message: "Libro agregado correctamente",data: updatedCollection})
  } catch (error) {
    logger.info(" Error al agregar libro a la coleccion")
    return res.status(400).json({ status: "error 400", message: error.message })
  }

}

module.exports = {
  createCollection,
  getCollectionById,
  addBookToCollection,
  getAllCollections
};