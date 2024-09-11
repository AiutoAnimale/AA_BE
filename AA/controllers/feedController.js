const bcrypt = require("bcrypt");
const { Feed } = require('../models');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { where } = require("sequelize");

const WriteFeed = async (req, res) => {
  const { nickname, title, body, tag, emergency, create_at } = req.body;
  const { token } = req.headers;

  try {
    const findUser = await User.findOne({
      where: { token }
    });

    if (!findUser) {
      return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
    }

    await Feed.create({
      nickname,
      title,
      body,
      tag,
      emergency,
      create_at
    });

    return res.status(201).json({ message: "게시글이 등록되었습니다." });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "게시글 등록에 실패하였습니다." });
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
      create_at: currentTime
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
      attributes: { exclude: ["nickname", "title", "body", "tag", "emergency"] }, // 오타 수정
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
