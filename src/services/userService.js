//Contiene la lógica de negocio (qué hay que hacer, cómo combinar los datos)
const { createUserRepository } = require('../repositories/userRepository')

const createUserService = async (name , email) =>{
    //ejempplo de como podemos enviar un error
    // const error = new Error("hay un error")
    // error.name = 400
    // throw error
    return await createUserRepository(name , email);
}

module.exports = {
    createUserService
}