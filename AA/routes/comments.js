const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "댓글 기능이 곧 추가될 예정입니다!" });
});

module.exports = router;
