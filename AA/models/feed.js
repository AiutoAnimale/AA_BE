const express = require('express');
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require('sequelize');
const { title } = require('process');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
});

const Feed = sequelize.define('Feed',{
  idx: {
    type : DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tag : {
    type: DataTypes.TEXT,
    allowNull: false
  },
  emergency:{ 
    type: DataTypes.TINYINT,
    allowNull: false
  },
  create_at:{
    type: DataTypes.DATETIME,
    allowNull: false
  }
})

