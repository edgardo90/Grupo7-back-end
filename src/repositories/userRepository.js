//Aca va estar la comounicacion con el model de la base de datos , en este caso en este caso va acceder a User
const User = require('../model/user')


const createUserRepository = async (name, email) => {
    const newUser = await User.create({ name, email })
    return newUser
}

module.exports = {
    createUserRepository
}