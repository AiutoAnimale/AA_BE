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

const Post = sequelize.define('Feed',{
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
app.post('/feed',async(req,res)=>{
  const {user} = req.query;
})
app.use(express.urlencoded({extended:true,})) 

/route/feeds
const express = require('express');
const { Feed } = require('../models');

const router = express.Router();

const feed = async (req, res, next) => {
  try {
    co
  } catch (error) {
    
  }
  
} 

router.route('/feed', async(req,res,next)=>{
  const{title,body,tag,emergency} = req.body;

  try{
    const feed = await Feed.create({
      title: title,
      body: body,
      tag:tag,
      emergency:emergency
    });
    return res.status(201).json({
      message: "입력 성공",
    });
  }catch(err){
    console.log(err);

    return res.status(500).json({
      message:"서버 에러",
    });
    
  }
})
