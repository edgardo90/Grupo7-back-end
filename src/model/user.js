const { Schema, model } = require('mongoose')


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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model('User', userSchema)

module.exports = User
