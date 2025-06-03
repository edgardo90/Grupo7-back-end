const express = require('express');
const cors = require('cors');

// Inicializamos la app de Express
const app = express();

// === Middlewares globales ===

// configuracion cors
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola esta funcionando Express!')
})

app.get('/{*any}', (req, res) => {
    res.status(404).json({status:"error 404" , message: 'Esa esa ruta no existe'});
})


module.exports = app;

