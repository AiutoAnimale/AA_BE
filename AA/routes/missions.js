const express = require("express");
const router = express.Router();
const missionController = require("../controllers/missionController");
const token = require("../middleware/token");

// 토큰 인증 미들웨어를 통해 보호된 엔드포인트 정의
router.post("/mission", token, missionController.mission);

module.exports = router;
