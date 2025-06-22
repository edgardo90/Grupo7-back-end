const { Schema, model } = require('mongoose')
const User = require('./user')

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "el titulo es requerido"]
        },
        author: {
            type: String,
            required: [true, "el autor es requerido"]
        },
        category: {
            type: String,
            enum: ["Libro", "Comic", "Manga"],
            default: "Libro"
        },
        genre: {
            type: String,
            enum: ["Drama", "Aventura", "Comedia", "Terror", "Romance", "Histórico"],
            required: [true, "el genero es requerido"]
        },
        description: {
            type: String,
            required: false
        },
        imageURL: {
            type: String,
            required: false
        },
        editorial: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
        versionKey: false
    }

)

// cada vez que se elimine un libro, se actualizara el array de libros de los usuarios
bookSchema.post("findOneAndDelete", async (book) => {
  console.log(book);
  if (book) {
    await User.updateMany(
      { books: book._id },
      { $pull: { books: book._id } }
    );
  }
});

const Book = model('Book', bookSchema)

module.exports= Book