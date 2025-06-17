const { Schema, model } = require('mongoose')

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

const Book = model('Book', bookSchema)

module.exports= Book