const logger = require('../config/logger');
const {
  createCollectionService,
  getCollectionByIdService,
  addBookToCollectionService,
  getAllCollectionsService,
  deleteCollectionService,
  editByIdCollectionService
} = require('../services/collectionService');

const createCollection = async (req, res) => {
  try {
    const { name, type, userId } = req.body;
    const {findUser , newCollection} = await createCollectionService(name, type, userId);
    logger.info(`Colección creada: ${newCollection._id}`);
    findUser.collections.push((await newCollection)._id);
    await findUser.save();
    res.status(201).json({ status: 'success 201', message: "Coleccion creada", data: newCollection });
  } catch (error) {
    logger.error("Error al crear colección:", error);
    res.status(error.name || 500).json({ status:'Error', message: error.message  });
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collection = await getCollectionByIdService(req.params.id);
    res.status(200).json({ status: 'success', message:'Mostrando Collection por id', data: collection });
  } catch (error) {
    logger.error("Error al obtener colección:", error);
    res.status(error.name || 500).json({status:'Error', message: error.message });
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
    return res.status(200).json({ status: 'success', message: "Libro agregado correctamente", data: updatedCollection })
  } catch (error) {
    logger.info(" Error al agregar libro a la coleccion")
    return res.status(400).json({ status: "error 400", message: error.message })
  }
}

const patchCollectionController = async(req,res) =>{
  try{
    const { id } = req.params;
    const { name, type } = req.body;
    const updadateCollection = await editByIdCollectionService(id, name , type);
    logger.info(`Modificando Collection por Id: ${id}`);
    return res.status(200).json({ status: 'success', message: `Collection Id: ${id}, modificado exitosamente`, data: updadateCollection });
  }catch(error){
    logger.error("Error a editar una Collection por ID", error);
    return res.status(400).json({ status: "Error 400", message: error.message });
  }
}

const deleteCollectionController = async(req, res) =>{
  try{
    const { id } = req.params;
    const deletedCollection = await deleteCollectionService(id);
    logger.info(`Collection eliminado: ${deletedCollection._id}`);
    return res.status(200).json({ status: "success 200", message: "Collection eliminado", data: deletedCollection });
  }catch(error){
    logger.error("Error a eleminar una Collection por ID", error);
    return res.status(400).json({ status: "Error 400", message: error.message });
  }
}

module.exports = {
  createCollection,
  getCollectionById,
  addBookToCollection,
  getAllCollections,
  patchCollectionController,
  deleteCollectionController
};