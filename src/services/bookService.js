const { createBookRepository, findAllBooksRepository } = require("../repositories/bookRepository");


const createBookService = async (title, author, category, genre, description, imageURL, editorial) => {
    return await createBookRepository(title, author, category, genre, description, imageURL, editorial);
}

const getAllBooksService = async () => {
    return await findAllBooksRepository()
}

module.exports = {
    createBookService,
    getAllBooksService
}