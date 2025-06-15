//Contiene la lógica de negocio (qué hay que hacer, cómo combinar los datos)
const { createUserRepository, findAllUsersRepository, userByIdRepository, editByIdUserRepository, deleteUserRepository } = require('../repositories/userRepository')

const createUserService = async (name, email) => {
    //ejempplo de como podemos enviar un error
    // const error = new Error("hay un error")
    // error.name = 400
    // throw error
    return await createUserRepository(name, email);
}

const getAllUsersService = async () => {
    return await findAllUsersRepository()
}

const getUserByIdService = async (id) => {
    const findUser = await userByIdRepository(id);
    if (!findUser) {
        const error = new Error(`Error! No se encontro el usuario  con el Id ${id}`);
        error.name = 404;
        throw error;
    }
    return findUser;
}

const patchUserByIdService = async (id, name, email) => {
    const findUser = await userByIdRepository(id);
    if (!findUser) {
        const error = new Error(`Error! No se encontro el usuario  con el Id ${id}`);
        error.name = 404;
        throw error;
    }
    const userUpdate = await editByIdUserRepository(id, name, email);
    return userUpdate;
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
    getAllUsersService,
    getUserByIdService,
    patchUserByIdService,
    deleteUserService
}