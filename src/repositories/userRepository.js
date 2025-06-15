//Aca va estar la comounicacion con el model de la base de datos , en este caso en este caso va acceder a User
const User = require('../model/user')
const { Query } = require('mongoose')


const createUserRepository = async (name, email) => {
    const newUser = await User.create({ name, email });
    return newUser;
}

const findAllUsersRepository = async () => {
    const users = await User.find().exec();
    return users;
}

const userByIdRepository = async (id) => {
    const findUser = await User.findById(id).exec();
    return findUser
}

const editByIdUserRepository = async (id, name, email) => {
    const userUpdate = await User.findByIdAndUpdate(id,
        {
            name,
            email
        },
        { new: true }
    )
    console.log(await userUpdate)
    return userUpdate
}

const deleteUserRepository = async (id) => {
    return await User.findByIdAndDelete(id)
}

module.exports = {
    createUserRepository,
    findAllUsersRepository,
    userByIdRepository,
    editByIdUserRepository,
    deleteUserRepository
}