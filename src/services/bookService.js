const { createBookRepository, findAllBooksRepository, bookByIdRepository, editByIdBookRepository, deleteBookByIdRepository } = require("../repositories/bookRepository");
const { getUserByIdService } = require('../services/userService')//


const createBookService = async (title, author, category, genre, description, imageURL, editorial, userId) => {
    const findUser = await getUserByIdService(userId);
    if (!findUser) {
        throw new Error("No se encontro el usuario con ese Id")
    }
    const newBook = await createBookRepository(title, author, category, genre, description, imageURL, editorial);
    return { findUser, newBook }
}

const getAllBooksService = async () => {
    return await findAllBooksRepository()
}

const getBookByIdService = async (id) => {
    const findBook = await bookByIdRepository(id);
    if (!findBook) {
        const error = new Error(`Error! No se encontro un libro con el Id ${id}`);
        error.name = 404;
        throw error;
    }
    return findBook;
}





const patchBookByIdService = async (id, title, author, category, genre, description, imageURL, editorial) => {
    const findBook = await bookByIdRepository(id);
    if (!findBook) {
        const error = new Error(`Error! No se encontro el libro  con el Id ${id}`);
        error.name = 404;
        throw error;
    }
    const bookUpdate = await editByIdBookRepository(id, title, author, category, genre, description, imageURL, editorial);
    return bookUpdate;
}

const deleteBookByIdService = async (id) => {
    const deletedBook = await deleteBookByIdRepository(id)
    if (!deletedBook) {
        throw new Error("Libro no encontrado")
    }
    return deletedBook
}



module.exports = {
    createBookService,
    getAllBooksService,
    getBookByIdService,
    patchBookByIdService,
    deleteBookByIdService
}