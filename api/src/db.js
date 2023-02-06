require('dotenv').config();//**para tener disponibles en procces.env nuestras variables de entorno definidas en .env como cadenas */
const { Sequelize } = require('sequelize');
const fs = require('fs');//** Permite trabajar con el sistema de archivos de la pc */
const path = require('path');//** Permite extraer el nombre de un archivo desde su ruta*/
const {DB_USER, DB_PASSWORD, DB_HOST, SERVER_PORT} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);//**obtiene el nombre del archivo actual db.js */
//console.log('basename',basename);

const modelDefiners = [];

//console.log('__dirname',__dirname);//**__dirname obtiene el nombre del directorio completo del archivo actual C:\Proyectos\PI_HENRY\api\src */

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  console.log('modelDefiners',modelDefiners);

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
console.log('sequelize.models',sequelize.models);
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
console.log('entries',entries);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
console.log('capsEntries',capsEntries);

sequelize.models = Object.fromEntries(capsEntries);
console.log('sequelize.models',sequelize.models);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Activities, Countries } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Countries.belongsToMany(Activities,{through:"CountriesActivities"});
Activities.belongsToMany(Countries,{through:"CountriesActivities"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, SERVER_PORT     // para importart la conexión { conn } = require('./db.js');
};
