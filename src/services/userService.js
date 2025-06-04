//Contiene la lógica de negocio (qué hay que hacer, cómo combinar los datos)
const { create } = require('../repositories/userRepository')

const createUserService = async (name , email) =>{
    return await create(name , email);
}

module.exports = {
    createUserService
}