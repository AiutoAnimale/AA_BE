const express = require('express');
const router = express.Router();
const comment = require("../controllers/commentController");
const token = require("../middleware/token");

router.post("/writeComment",token, comment.writeComment);
router.patch("/EditComment", token,comment.EditComment);
router.delete("/DeleteComment",token,comment.DeleteComment);
router.get("/viewComment", token,comment.viewComment);

module.exports = router;
