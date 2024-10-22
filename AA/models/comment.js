const express = require('express');
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment',{
  idx: {
    type : DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  feedid: {
    type : DataTypes.INTEGER,
    allowNull: false
  },
  userid: {
    type : DataTypes.TEXT,
    allowNull: false
  },
  nickname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  create_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
