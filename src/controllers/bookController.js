const { createBookService, getAllBooksService, getBookByIdService, patchBookByIdService, deleteBookByIdService } = require('../services/bookService')
const logger = require('../config/logger');

const createBook = async (req, res) => {
    try {
        const { title, author, category, genre, description, imageURL, editorial, userId } = req.body
        const { findUser , newBook } = await createBookService(title, author, category, genre, description, imageURL, editorial, userId)
        logger.info(`Se creo un nuevo libro con el ID_ id:${newBook._id}`)
        findUser.books.push(newBook._id);
        await findUser.save();
        return res.status(201).json({ status: "success 201", message: "Libro creado exitosamente", data: newBook });
    } catch (error) {
        logger.error("error al crear un nuevo libro", error);
        return res.status(400).json({ status: "Error 400", message: error.message });
    }
}

const getAllBooks = async (req, res) => {
    try {
        logger.info("Utilizando getAllBooks para traer todos los libros");
        const books = await getAllBooksService();
        return res.status(200).json({ status: "success 200", message: "Se traen todos los libros", data: books })
    } catch (error) {
        logger.error("Error al traer todos los libros", error);
        return res.status(500).json({ status: "Error 500", message: error.message });
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        logger.info(`Usa getBookById para traer un libro por Id: ${id}`);
        const book = await getBookByIdService(id);
        return res.status(200).json({ status: 'success', message: `Mostrando libro por Id: ${id}`, data: book });
    } catch (error) {

        logger.error("Error al traer un libro por ID", error);
        return res.status(500).json({ status: "Error 500", message: error.message });
    }

}

// el patch es para editar
const patchBookById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, author, category, genre, description, imageURL, editorial } = req.body;
        const editBook = await patchBookByIdService(id, title, author, category, genre, description, imageURL, editorial)
        logger.info(`Utilizando  patchBookById para modificar un libro por Id: ${id}`);
        return res.status(200).json({ status: 'success', message: `Book Id: ${id}, modificado exitosamente`, data: editBook });
    } catch (error) {
        logger.error("Error a editar un libro por ID", error);
        return res.status(400).json({ status: "Error 400", message: error.message });
    }
}

const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await deleteBookByIdService(id)
        logger.info(`Libro eliminado: ${deletedBook._id}`)
        return res.status(200).json({ status: "success 200", message: "Libro eliminado", data: deletedBook })
    } catch (error) {
        logger.error("Error al eliminar usuario", error)
        return res.status(400).json({ status: "error 400", message: error.message })
    }
}


module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    patchBookById,
    deleteBookById  
}