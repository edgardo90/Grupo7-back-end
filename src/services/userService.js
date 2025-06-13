//Contiene la lógica de negocio (qué hay que hacer, cómo combinar los datos)
const { createUserRepository, updateUserRepository, deleteUserRepository } = require('../repositories/userRepository')
const User = require('../model/user');

const createUserService = async (name , email) =>{
    //ejempplo de como podemos enviar un error
    // const error = new Error("hay un error")
    // error.name = 400
    // throw error
    return await createUserRepository(name , email);
}

/* const createUserService = async (name, email) => {
    const newUser = new User({ name, email})
    await newUser.save()
    return newUser
} */

const getUsersService = async () => {
    const users = await User.find(); // Busca todos los usuarios
    return users;
}

const updateUserService = async (id, data) => {
    const updatedUser = await updateUserRepository(id, data)
    if (!updatedUser) {
        throw new Error ("Usuario no encontrado")
    }
    return updatedUser
}

const deleteUserService = async (id) => {
    const deletedUser = await deleteUserRepository(id)
    if (!deletedUser) {
        throw new Error("Usuario no encontrado")
    }
    return deletedUser
}

module.exports = {
    createUserService,
    getUsersService,
    updateUserService,
    deleteUserService
}