const app = require('./src/app'); // Importar la app de Express ya configurada
const dotenv = require('dotenv');
const bunyan = require('bunyan')


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
  await startExpress();
}

startServer();