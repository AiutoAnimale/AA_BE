const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

// Ensure you don't declare the same model twice
const Comment = require('./comment')(sequelize);
const Feed = require('./feed')(sequelize);
const User = require('./user')(sequelize);
const Vet = require('./vet')(sequelize);  // Ensure this model is defined only once
const Mission = require('./mission')(sequelize); // This should be declared only once
const Act = require('./act')(sequelize);

// DB 객체 생성
const db = {
  sequelize,
  Sequelize,
  Comment,
  Feed,
  User,
  Vet,
  Mission, 
  Act,
};

module.exports = db;
