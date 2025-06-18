const { createBookRepository, findAllBooksRepository } = require("../repositories/bookRepository");
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

module.exports = {
    createBookService,
    getAllBooksService
}