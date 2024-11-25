const { Op } = require('sequelize');
const { Vet } = require('../models');

const searchVet = async (req, res) => {
  const { result } = req.body;

  if (!result || result.trim() === '') {
    return res.status(400).json({ message: "검색어를 입력해주세요." });
  }

  try {
    const data = await Vet.findAll({
      where: {
        [Op.or]: [
          { location: { [Op.like]: `%${result}%` } },
          { roadname: { [Op.like]: `%${result}%` } },
          { name: { [Op.like]: `%${result}%` } },
        ],
      },
      attributes: ['phone', 'location', 'roadname', 'name'],
    });

    if (data.length === 0) {
      return res.status(404).json({ message: "해당 조건의 동물병원을 찾을 수 없습니다." });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "동물병원 검색에 실패했습니다." });
  }
};

module.exports = { searchVet };
