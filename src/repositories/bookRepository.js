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

const bookByIdRepository = async (id) => {
    const findBook = await Book.findById(id).exec();
    return findBook
}

const editByIdBookRepository = async (id, title, author, category, genre, description, imageURL, editorial) => {
    const bookUpdate = await Book.findByIdAndUpdate(id,
        {
           title, 
           author, 
           category, 
           genre, 
           description, 
           imageURL, 
           editorial
        },
        { new: true }
    )
    console.log(await bookUpdate)
    return bookUpdate
}

const deleteBookByIdRepository = async (id) => {
    return await Book.findByIdAndDelete(id)
}


module.exports = {
    createBookRepository,
    findAllBooksRepository,
    bookByIdRepository,
    editByIdBookRepository,
    deleteBookByIdRepository
}
