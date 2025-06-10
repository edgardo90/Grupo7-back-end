const app = require('./src/app'); // Importar la app de Express ya configurada
const { connectMongoDB } = require('./src/config/mongoConnect')
const dotenv = require('dotenv');
const bunyan = require('bunyan');


dotenv.config();

const bunyanLog = bunyan.createLogger({ name: 'app' })


// Definir puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

// Iniciar el servidor
const startExpress = async () => {
    app.listen(PORT, () => {
        bunyanLog.info(`Servidor corriendo en http://${HOST}:${PORT}`);
    });
}


const startServer = async () => {
    let isConnectDataBase = true
    try {
        await connectMongoDB()
    } catch (error) {
        isConnectDataBase = false
        bunyanLog.error("error a conectar la Data Base MongooDB" , error)
    }
    await startExpress();
    if(!isConnectDataBase){
        bunyanLog.warn("Servidor corriendo pero error a conectar a la Data Base")
    }
}

startServer();