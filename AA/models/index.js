const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

// 각 모델 초기화
const Comment = require('./comment')(sequelize);
const Feed = require('./feed')(sequelize);
const User = require('./user')(sequelize);

// DB 객체 생성
const db = {
  sequelize,
  Sequelize,
  Comment,
  Feed,
  User,
};

module.exports = db;
