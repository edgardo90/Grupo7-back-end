const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: [true, "el email es requerido"],
            unique: [true, "hay un usuario registrado con ese email"]
        },
        password: {
            type: String,
            require: [true, "El passeword es requerido"],
        },
        books: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
        collections: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Collection'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

//aca hago la "relacion" por referencia , para que cuando haga cualquier metodo con el metodo User trae lo que tiene por referencia "books" y "collections"
userSchema.pre(/^find/, async function (next) {
    this.populate({
        path: 'books',
        select: '-createdAt -updatedAt'
    });
    this.populate({
        path: 'collections',
        select: '-createdAt -updatedAt'
    });
    next()
})

const User = model('User', userSchema)

module.exports = User
