const express = require('express');
const { Feed } = require('../models');  
const router = express.Router();
const feed = require("../controllers/feedController");
const token = require("../middleware/token");

router.post("/WriteFeed",token, feed.WriteFeed);
router.post("/feeds/uploadImage/:id", token, feed.uploadImage);
router.patch("/EditFeed",token,feed.EditFeed);
router.delete("/DeleteFeed",token,feed.DeleteFeed);
router.get("/ViewFeedDetails", token, feed.ViewFeedDetails);
router.get("/searchFeed", token, feed.searchFeed);
router.get("/viewMyFeeds", token, feed.viewMyFeeds);
router.get("/viewAllList", token, feed.viewAllList);

module.exports = router;  
