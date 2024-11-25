const { User, Mission } = require('../models'); 

const mission = async (req, res) => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;

  const userId = req.user.id;

  try {
    const randomMission = await Mission.findByPk(randomIndex);
    if (!randomMission) {
      return res.status(404).json({ message: "문제를 찾을 수 없습니다." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    user.level += 1; 
    await user.save(); 

    return res.status(200).json({
      message: "문제를 성공적으로 가져왔습니다.",
      mission: randomMission, 
      newLevel: user.level, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "문제를 처리하는 중 오류가 발생했습니다." });
  }
};

module.exports = { mission };
