const bcrypt = require("bcrypt");
const { Feed, User } = require('../models'); // User 모델 추가
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { where } = require("sequelize");
const multer = require("multer");
const path = require('path');

const WriteFeed = async (req, res) => {
  const { nickname, title, body, tag, emergency } = req.body;
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

    // 게시글 생성
    const newFeed = await Feed.create({
      userid: findUser.userid, // User의 userid 추가
      nickname,
      title,
      body,
      tag,
      emergency,
      createdAt: new Date(), // createdAt 기본값 설정
    });

    return res.status(201).json({
      message: "게시글이 등록되었습니다.",
      feedId: newFeed.idx, // Feed 모델의 기본 키(idx) 반환
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "게시글 등록에 실패하였습니다." });
  }
};

const EditFeed = async (req, res) => {
  const { title, body, tag, emergency } = req.body;
  const { token } = req.headers;

  try {
    const findUser = await User.findOne({
      where: { token }
    });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    const feedId = req.params.id;
    const feed = await Feed.findOne({ where: { id: feedId } });

    if (!feed) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const currentTime = new Date();

    await feed.update({
      title,
      body,
      tag,
      emergency,
      createdAt: currentTime
    });

    return res.status(200).json({ message: "게시글이 수정되었습니다." });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "게시글 수정에 실패하였습니다." });
  }
};

const DeleteFeed = async (req, res) => {
  const { token } = req.headers;

  try {
    const findUser = await User.findOne({
      where: { token }
    });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    const feedId = req.params.id;
    const feed = await Feed.findOne({ where: { id: feedId } });

    if (!feed) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    await feed.destroy(); 

    return res.status(200).json({ message: "게시글이 삭제되었습니다." });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "게시글 삭제에 실패하였습니다." });
  }
};

const ViewFeedDetails = async (req, res) => {
  try {
    const feedId = req.params.id;
    const feed = await Feed.findOne({ where: { id: feedId } });

    if (!feed) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    return res.status(200).json(feed);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "게시글 조회에 실패하였습니다." });
  }
};

const searchFeed = async (req, res) => {
  const { result } = req.body;

  try {
    const data = await Feed.findAll({
      where: { result },
      attributes: { exclude: ["nickname", "title", "body", "tag", "emergency"] }, 
    });

    if (data.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "게시글 검색에 실패했습니다." });
  }
};

const viewMyFeeds = async (req, res) => {
  const { token } = req.headers;

  try {
    const findUser = await User.findOne({
      where: { token }
    });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    const data = await Feed.findAll({
      where: { nickname: findUser.nickname }, 
      attributes: { exclude: ["title", "body", "tag", "emergency", "createdAt"] },
    });

    if (data.length === 0) {
      return res.status(404).json({ message: "작성한 게시글이 없습니다." });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "게시글 검색에 실패했습니다." });
  }
};

const viewAllList = async (req, res) => {
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

    // 전체 피드 조회
    const data = await Feed.findAll({
      attributes: ['idx', 'userid', 'nickname', 'emergency'], // 필요한 필드만 선택
    });

    if (data.length === 0) {
      return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
    }

    return res.status(200).json(data); // 조회된 데이터 반환
  } catch (err) {
    console.error("viewAllList Error: ", err);
    return res.status(500).json({ message: "서버 내부 오류" });
  }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');

const uploadImage = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const findUser = await User.findOne({ where: { token } });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    console.log('image');

    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "이미지 업로드에 실패했습니다." });
      }

      return res.status(200).json({ message: "이미지 업로드 성공", file: req.file });
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "이미지 업로드에 실패했습니다." });
  }
};

module.exports = {
  WriteFeed,
  EditFeed,
  DeleteFeed,
  ViewFeedDetails,
  searchFeed,
  viewMyFeeds,
  viewAllList,
  uploadImage
};
