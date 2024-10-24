const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const feedsRouter = require('./feeds');
const commentsRouter = require('./comments');


router.use('/users', usersRouter);
router.use('/feeds', feedsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
