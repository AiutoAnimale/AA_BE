const bcrypt = require("bcrypt");
const { Comment, User, Feed } = require('../models');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { where } = require("sequelize");
const multer = require("multer");
const path = require('path');

const writeComment = async (req, res) => {
  const { nickname, body, feed_id } = req.body; // feed_id로 수정
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "유효한 토큰이 필요합니다." });
  }

  try {
    const findUser = await User.findOne({ 
      where: { token },
    });
    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    if (!feed_id) { // feed_id 체크
      return res.status(400).json({ message: "게시물을 찾을 수 없습니다" });
    }

    const userNickname = nickname || findUser.nickname; 

    // 댓글 생성
    const newComment = await Comment.create({
      feed_id, // feed_id 사용
      nickname: userNickname,
      body,
      userid: findUser.userid,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "댓글이 등록되었습니다.", data: newComment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "댓글 등록에 실패하였습니다." });
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

const viewComment = async (req, res) => {
  const { feed_id } = req.query; // URL 쿼리 파라미터로 feed_id 받기
  const { authorization } = req.headers;

  // Bearer 토큰 파싱
  const token = authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
  }

  try {
    // 사용자 인증 확인
    const findUser = await User.findOne({ where: { token } });

    if (!findUser) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }

    // feed_id에 해당하는 댓글 조회
    const comments = await Comment.findAll({
      where: { feed_id }, // 해당 feed_id에 맞는 댓글 조회
      attributes: ['idx', 'userid', 'nickname', 'body', 'createdAt'], // 필요한 필드만 선택
      order: [['createdAt', 'ASC']] // 댓글을 작성일 순으로 정렬
    });

    // 댓글이 없으면 빈 배열 반환
    return res.status(200).json(comments); 

  } catch (err) {
    console.error("viewComment Error: ", err);
    return res.status(500).json({ message: "서버 내부 오류" });
  }
};


module.exports = {
  writeComment,
  EditComment,
  DeleteComment,
  viewComment,
};

