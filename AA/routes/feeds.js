const express = require('express');
const { Feed } = require('../models');

const router = express.Router();

router.post('/feed', async(req, res,next)=> {
  try{
    const feed = await Feed.create({
      id : req.body.userid, 
      title: req.body.title,
      body: req.body.body,
      tag: req.body.tag,
      emergency: req.body.emergency
    });
    console.log(body);
    res.status(201).json(body)
  }catch(err){
    console.error(err);
    next(err);
  }
});
router.route('/feed', async(req,res,next)=>{
  const{title,body,tag,emergency} = req.body;

  try{
    const feed = await Feed.create({
      title: title,
      body: body,
      tag:tag,
      emergency:emergency
    });
    return res.status(201).json({
      message: "입력 성공",
    });
  }catch(err){
    console.log(err);

    return res.status(500).json({
      message:"서버 에러",
    });
    
  }
})