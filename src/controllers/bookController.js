const { createBookService, getAllBooksService } = require('../services/bookService')
const logger = require('../config/logger')

const createBook = async (req, res) => {
    try {
        const { title, author, category, genre, description, imageURL, editorial} = req.body
        const newBook = await createBookService(title, author, category, genre, description, imageURL, editorial)
        logger.info(`Se creo un nuevo libro con el ID_ id:${newBook._id}`)
        return res.status(201).json({ status: "success 201", message: "Libro creado exitosamente", data: newBook });        
    } catch (error) {
        logger.error("error al crear un nuevo libro", error);
        return res.status(400).json({ status: "Error 400", message: error.message});    
    }
}

const getAllBooks = async (req, res) => {
    try {
        logger.info("Utilizando getAllBooks para traer todos los libros");
        const books = await getAllBooksService();
        return res.status(200).json({ status: "success 200", message: "Se traen todos los libros",data: books})
    } catch (error) {
        logger.error("Error al traer todos los libros", error);
        return res.status(500).json({ status: "Error 500", message: error.message });
    }
}

module.exports = {
    createBook,
    getAllBooks    
}