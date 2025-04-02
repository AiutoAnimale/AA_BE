const express = require('express');
const router = express.Router();
const { mission, checkAnswer } = require('../controllers/missionController');
const authenticationMiddleware = require('../middleware/token');

// 미션 라우터
router.get('/mission', authenticationMiddleware, mission);
router.post('/mission/check', authenticationMiddleware, checkAnswer);

module.exports = router;
