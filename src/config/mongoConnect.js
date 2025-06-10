// getting-started.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bunyan = require('bunyan');

dotenv.config();

const bunyanLog = bunyan.createLogger({ name: 'app' })

const DATA_BASE = process.env.DATABASE;

const connectMongoDB = async () => {
    await mongoose.connect(DATA_BASE);
    bunyanLog.info("Base de datos conectada con exito")
}


module.exports = { connectMongoDB }