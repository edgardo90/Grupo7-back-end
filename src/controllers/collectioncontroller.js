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

module.exports = {
  createCollection,
  getCollectionById,
  addBookToCollection,
  getAllCollections
};