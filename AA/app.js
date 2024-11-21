const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { sequelize } = require('./models'); 
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const feedsRouter = require('./routes/feeds');
const commentsRouter = require('./routes/comments'); 

const app = express(); 

app.use((req, res, next) => {
  console.log(`Request Path: ${req.path}`);
  next();
});

app.use(express.json()); 


app.use('/users', usersRouter);
app.use('/feeds', feedsRouter);
app.use('/comments', commentsRouter); 
app.use('/', indexRouter); 

app.listen(5310, () => {
  console.log('Server is running on port 5310');
});
