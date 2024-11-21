const express = require('express');
const { Feed } = require('../models');  
const router = express.Router();
const feed = require("../controllers/feedController");
const token = require("../middleware/token");


router.get('/', async (req, res) => {
    try {
        const feeds = await Feed.findAll();  
        return res.status(200).json(feeds); 
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });  
    }
});

router.post('/', async (req, res) => {
    const { userid, nickname, title, body, tag, emergency } = req.body;

    try {
        const newFeed = await Feed.create({
            userid,
            nickname,
            title,
            body,
            tag,
            emergency,
            create_at: new Date(),  
        });

        return res.status(201).json(newFeed);  
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });  
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const feed = await Feed.findByPk(id); 

        if (!feed) {
            return res.status(404).json({ message: "피드를 찾을 수 없습니다." });
        }

        return res.status(200).json(feed);  
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });  
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const feed = await Feed.findByPk(id);

        if (!feed) {
            return res.status(404).json({ message: "피드를 찾을 수 없습니다." });
        }

        await feed.destroy();  
        return res.status(200).json({ message: "피드가 삭제되었습니다." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "서버 오류" });  
    }
});

router.post("/WriteFeed",token, feed.WriteFeed);
router.post("/uploadImage", token,feed.uploadImage);
router.patch("/EditFeed",token,feed.EditFeed);
router.delete("/DeleteFeed",token,feed.DeleteFeed);
router.get("/ViewFeedDetails", token, feed.ViewFeedDetails);
router.get("/searchFeed", token, feed.searchFeed);
router.get("/viewMyFeeds", token, feed.viewMyFeeds);
router.get("/viewAllList", token, feed.viewAllList);

module.exports = router;  
