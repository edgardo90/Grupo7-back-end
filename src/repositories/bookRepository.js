const Book = require('../model/book')
const { Query } = require('mongoose')

const createBookRepository = async (title, author, category, genre, description, imageURL, editorial) => {
    const newBook = await Book.create({title, author, category, genre, description, imageURL, editorial})
    return newBook
}

const findAllBooksRepository = async () => {
    const books = await Book.find().exec();
    return books
}

module.exports = {
    createBookRepository,
    findAllBooksRepository
}