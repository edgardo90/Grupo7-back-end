const { createUserService } = require('../services/userService')
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


module.exports = {
    createUser
}