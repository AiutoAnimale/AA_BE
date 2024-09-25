const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

const User = require('./user')(sequelize); 
const Feed = require('./feed')(sequelize);

module.exports = { sequelize, User, Feed };
