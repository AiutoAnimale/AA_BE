const { Op } = require('sequelize');
const { Act } = require('../models');

const searchAct = async (req, res) => {
  const { category } = req.query; // 클라이언트에서 카테고리 값을 query 파라미터로 받음

  try {
    if (!category) {
      return res.status(400).json({ message: '카테고리 값이 필요합니다.' });
    }

    // 카테고리에 맞는 게시물 찾기
    const acts = await Act.findAll({
      attributes: ['idx', 'categories', 'title', 'body', 'createdAt'], // title과 body를 반환하도록 설정
      where: {
        categories: {
          [Op.eq]: category, // Op.eq를 사용하여 'categories' 필드 값이 category와 일치하는 항목을 찾음
        }
      }
    });

    if (acts.length === 0) {
      return res.status(404).json({ message: '해당 카테고리에 대한 게시물이 없습니다.' });
    }

    return res.status(200).json(acts);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '게시물 검색에 실패했습니다.' });
  }
};


module.exports = { searchAct };
