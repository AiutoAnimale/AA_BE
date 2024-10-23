const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // DBMS에 맞게 변경
  port: process.env.DB_PORT,
});

// 각 모델을 초기화
const User = require('./user')(sequelize, DataTypes); // require 방식
const Feed = require('./feed')(sequelize, DataTypes); // require 방식
const Comment = require('./comment')(sequelize, DataTypes); // require 방식

// 또는 함수 호출 방식 사용 가능
// const User = UserModel(sequelize, DataTypes);
// const Feed = FeedModel(sequelize, DataTypes);
// const Comment = CommentModel(sequelize, DataTypes);

// 내보낼 객체
const db = {
  sequelize,
  Sequelize,
  User,
  Feed,
  Comment
};

module.exports = db;
