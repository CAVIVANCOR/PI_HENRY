const express = require('express');
const cookieParser = require('cookie-parser');//**esto siver para los CORS */
const bodyParser = require('body-parser');
const morgan = require('morgan');
const countriesRoutes = require('./routes/countriesRouter');
const activitiesRoutes = require('./routes/activitiesRouter');

const { SERVER_PORT } = require('./db.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));//** app.use(express.urlencoded({ extended: false })) para recibir datos por el body util en formularios html */
server.use(bodyParser.json({ limit: '50mb' }));//** app.use(express.json()) para que convierta a json el request*/
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/countries', countriesRoutes);
server.use('/activities', activitiesRoutes);

// Error catching endware. Manejo de errores
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
