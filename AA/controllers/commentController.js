const bcrypt = require("bcrypt");
const { Comment, User } = require('../models');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { where } = require("sequelize");
const multer = require("multer");
const path = require('path');

const writeComment = async (req, res) => {
  const { nickname, body, create_at } = req.body;
  const { token } = req.headers;  

  try {
    const findUser = await User.findOne({ where: { token } });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    await Comment.create({
      nickname,
      body,
      create_at,
      userId: findUser.id  
    });

    return res.status(201).json({ message: "댓글이 등록되었습니다." });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "댓글 등록에 실패하였습니다." });
  }
};

const EditComment = async (req, res) => {
  const { body } = req.body;
  const { token } = req.headers;

  try {
    const findUser = await User.findOne({ where: { token } });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    const commentId = req.params.id;
    const comment = await Comment.findOne({ where: { id: commentId } });

    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    await comment.update({
      body,
      updated_at: new Date() 
    });

    return res.status(200).json({ message: "댓글이 수정되었습니다." });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "댓글 수정에 실패하였습니다." });
  }
};

const DeleteComment = async (req, res) => {
  const { token } = req.headers;

  try {
    const findUser = await User.findOne({ where: { token } });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    const commentId = req.params.id;
    const comment = await Comment.findOne({ where: { id: commentId } });  

    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    await comment.destroy(); 

    return res.status(200).json({ message: "댓글이 삭제되었습니다." });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "댓글 삭제에 실패하였습니다." });
  }
};

module.exports = {
  writeComment,
  EditComment,
  DeleteComment
};
