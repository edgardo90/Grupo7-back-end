const { createUserService } = require('../services/userService')
const bunyan = require('bunyan');

const bunyanLog = bunyan.createLogger({ name: 'app' })

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body
        console.log(name, email)
        const newUser = await createUserService(name, email)
        bunyanLog.info(`Se creo un nuevo Usuario con el ID _id:${newUser._id}`)
        return res.status(201).json({ status: "success 201", message: "Usuario creado exitosamente", data: newUser });
    } catch (error) {
        bunyanLog.error("error a crear un nuevo usuario", error)
        return res.status(500).json({ status: "error 500", message: error.message });
    }
}


module.exports = {
    createUser
}