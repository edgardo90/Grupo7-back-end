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
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

userSchema.pre(/^find/, async function (next) {
    this.populate({
        path: 'books',
        select: '-createdAt -updatedAt'
    })
    next()
})

const User = model('User', userSchema)

module.exports = User
