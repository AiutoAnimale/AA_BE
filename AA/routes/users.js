const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const token = require("../middleware/token");

router.post("/login", user.login);
router.post("/signup", user.signup);
router.get("/logout", token, user.logout);
router.get("/info", token, user.getUser);
router.patch("/update", token, user.updateUser);

module.exports = router;