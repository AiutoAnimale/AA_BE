const express = require('express');
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const {sequelize} = require('./models');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const feedsRouter = require('./routes/feeds');
const CommentsRouter = require('./routes/comments');

const app = express();
