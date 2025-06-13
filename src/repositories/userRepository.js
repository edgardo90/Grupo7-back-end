//Aca va estar la comounicacion con el model de la base de datos , en este caso en este caso va acceder a User
const User = require('../model/user')


const createUserRepository = async (name, email) => {
    const newUser = await User.create({ name, email })
    return newUser
}

const updateUserRepository = async (id, data) => {
    return await User.findByIdAndUpdate( id , data, { new: true})
}

const deleteUserRepository = async (id) => {
    return await User.findByIdAndDelete(id)
}

module.exports = {
    createUserRepository,
    updateUserRepository,
    deleteUserRepository

}