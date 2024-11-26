const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { sequelize } = require('./models'); 
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const feedsRouter = require('./routes/feeds');
const commentsRouter = require('./routes/comments'); 
const vetRouter = require('./routes/vets');
const missionRouter = require('./routes/missions');
const actRouter = require('./routes/acts');

const app = express(); 

app.use((req, res, next) => {
  console.log(`Request Path: ${req.path}`);
  next();
});

app.use(cors());
app.use(express.json());


app.use('/users', usersRouter);
app.use('/feeds', feedsRouter);
app.use('/comments', commentsRouter); 
app.use('/vets', vetRouter);
app.use('/missions', missionRouter);
app.use('/acts', actRouter);
app.use('/', indexRouter); 

app.listen(5310, () => {
  console.log('Server is running on port 5310');
});
