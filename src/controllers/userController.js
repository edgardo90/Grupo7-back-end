const { createUserService, getUsersService, updateUserService, deleteUserService } = require('../services/userService')
const logger = require('../config/logger')

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        const newUser = await createUserService(name, email)
        logger.info(`Se creo un nuevo Usuario con el ID _id:${newUser._id}`)
        return res.status(201).json({ status: "success 201", message: "Usuario creado exitosamente", data: newUser });
    } catch (error) {
        logger.error("error a crear un nuevo usuario", error);
        return res.status(400).json({ status: "error 400", message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        logger.info(`Se obtienen ${users.length} usuarios`);
        return res.status(200).json({ status: "success 200", data: users})

    } catch (error) {
        logger.error("Error al obtener usuarios", error)
        return res.status(500).json({ status: "error 500", message: error.message })
    }  
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body
        const updateUser = await updateUserService(id, data)
        logger.info(`Usuario actualizado: ${updateUser._id}`)
        return res.status(200).json({ status: "success 200", message: "Usuario actualizado", data: updateUser})
    } catch (error) {
        logger.error("Error al actualizar usuario", error)
        return res.status(400).json({ status: "error 400", message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserService(id)
        logger.info(`Usuario eliminado: ${deletedUser._id}`)
        return res.status(200).json({ status: "success 200", message: "Usuario eliminado", data: deletedUser})
    } catch (error) {
        logger.error("Error al eliminar usuario", error)
        return res.status(400).json({ status: "error 400", message: error.message})
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}