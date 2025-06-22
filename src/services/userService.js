//Contiene la lógica de negocio (qué hay que hacer, cómo combinar los datos)
const {
    createUserRepository,
    findAllUsersRepository,
    userByIdRepository,
    editByIdUserRepository,
    deleteUserRepository,
    findByEmailUserRepository
} = require('../repositories/userRepository');
const { hash, compare } = require("bcrypt");

const createUserService = async (name, email, password) => {
    //ejempplo de como podemos enviar un error
    // const error = new Error("hay un error")
    // error.name = 400
    // throw error
    if (!password) {
        const error = new Error("Error! , el password es requerido")
        error.name = 400
        throw error
    }
    const hashPassword = await hash(password, 10)
    return await createUserRepository(name, email, hashPassword);
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


const loginUserService = async (email, password) => {
    if (!email) {
        const error = new Error("Error! , el email es requerido")
        error.name = 400
        throw error
    }
    if (!password) {
        const error = new Error("Error! , el password es requerido")
        error.name = 400
        throw error
    }
    const findUser = await findByEmailUserRepository(email);
    if (!findUser) {
        const error = new Error(`Error! email  y password incorrectos`);
        error.name = 404;
        throw error;
    }
    const matchPassword = await compare(password, findUser.password)
    if (!matchPassword) {
        const error = new Error(`Error! email  y password incorrectos`);
        error.name = 404;
        throw error;
    }
    return findUser
}



module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    patchUserByIdService,
    deleteUserService,
    loginUserService
}