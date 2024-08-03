const { Sequelize } = require("sequelize");
const database = new Sequelize('latihan_nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
  module.exports = database;