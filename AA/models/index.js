const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

const User = require('./user')(sequelize, DataTypes);
const Feed = require('./feed')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Feed,
  Comment,
};

module.exports = db;
