const express = require("express");
const router = express.Router();
const vetController = require("../controllers/vetController");
const token = require("../middleware/token");

// 토큰 인증 미들웨어를 통해 보호된 동물병원 검색 엔드포인트 정의
router.post("/searchVet", token, vetController.searchVet);

module.exports = router;
