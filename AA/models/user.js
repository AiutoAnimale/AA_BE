const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  return sequelize.define('User', {
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userid: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    userpw: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    level : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pet_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pet_sex: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    species: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pet_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = User;
