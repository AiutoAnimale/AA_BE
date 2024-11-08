const { DataTypes } = require('sequelize');
require("dotenv").config();

const Feed = (sequelize) => {
  return sequelize.define('Feed', {
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nickname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    emergency: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
};

module.exports = Feed;
