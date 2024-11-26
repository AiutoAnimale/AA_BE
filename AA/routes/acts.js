const express = require('express');
const { searchAct } = require('../controllers/actControllr');
const router = express.Router();

// 카테고리로 게시물 검색
router.get('/searchAct', searchAct);

module.exports = router;
