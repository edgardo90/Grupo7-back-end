const {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    patchUserByIdService,
    deleteUserService,
    loginUserService
} = require('../services/userService')
const logger = require('../config/logger')

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const newUser = await createUserService(name, email, password)
        logger.info(`Se creo un nuevo Usuario con el ID _id:${newUser._id}`)
        return res.status(201).json({ status: "success 201", message: "Usuario creado exitosamente", data: newUser });
    } catch (error) {
        logger.error("error a crear un nuevo usuario", error);
        return res.status(400).json({ status: "Error 400", message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        logger.info("Utilizando getAllUsers para traer todos los usuarios");
        const users = await getAllUsersService();
        return res.status(200).json({ status: 'success', message: 'Mostrando todos los usuarios', data: users });
    } catch (error) {
        logger.error("Error a traer todos los usuarios", error);
        return res.status(500).json({ status: "Error 500", message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        logger.info(`Utilizando  getUserById para traer un usuario por Id: ${id}`);
        const user = await getUserByIdService(id);
        return res.status(200).json({ status: 'success', message: `Mostrando usuario Id: ${id}`, data: user });
    } catch (error) {
        logger.error("Error a traer un usuario por ID", error);
        if (error.name && error.name === 404) {
            return res.status(error.name).json({ status: `Error ${error.name}`, message: error.message });
        }
        return res.status(400).json({ status: "Error 400", message: error.message });
    }
}

const patchUserById = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body;
        const editUser = await patchUserByIdService(id, name, email)
        logger.info(`Utilizando  patchUserById modificar un usuario por Id: ${id}`);
        return res.status(200).json({ status: 'success', message: `Usuario Id: ${id}, modificado exitosamente`, data: editUser });
    } catch (error) {
        logger.error("Error a editar un usuario por ID", error);
        return res.status(400).json({ status: "Error 400", message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserService(id)
        logger.info(`Usuario eliminado: ${deletedUser._id}`)
        return res.status(200).json({ status: "success 200", message: "Usuario eliminado", data: deletedUser })
    } catch (error) {
        logger.error("Error al eliminar usuario", error)
        return res.status(400).json({ status: "error 400", message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password)
        logger.info(`Usuario login exitoso _id:${user._id}`)
        return res.status(201).json({ status: "success 201", message: "Usuario login correctamente", data: user })
    } catch (error) {
        logger.error("Error cuando el usuario quiere inicicar sesion", error)
        return res.status(400).json({ status: "error 400", message: error.message })
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    patchUserById,
    deleteUser,
    loginUser
}