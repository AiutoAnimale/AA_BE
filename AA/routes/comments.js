const express = require('express');
const router = express.Router();
const comment = require("../controllers/commentController");
const token = require("../middleware/token");

router.get('/', (req, res) => {
    res.status(200).json({ message: "댓글 기능이 곧 추가될 예정입니다!" });
});

router.post("/writeComment",token, comment.writeComment);
router.post("/EditComment", token,comment.EditComment);
router.patch("/DeleteComment",token,comment.DeleteComment);

module.exports = router;
