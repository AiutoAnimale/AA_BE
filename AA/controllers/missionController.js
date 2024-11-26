const { User, Mission } = require('../models');

const mission = async (req, res) => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;

  const userId = req.user.id;  // 사용자 ID

  try {
    // 무작위 미션 조회
    const randomMission = await Mission.findByPk(randomIndex);
    if (!randomMission) {
      return res.status(404).json({ message: "문제를 찾을 수 없습니다." });
    }

    // 사용자의 정보 조회
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 이미 미션을 풀었는지 확인
    if (user.missionCompleted && user.missionCompleted.includes(randomIndex)) {
      return res.status(400).json({ message: "이 문제는 이미 풀었습니다." });
    }

    // 사용자로부터 제출된 답변을 받음
    const { selectedAnswer } = req.body;  // selectedAnswer는 사용자가 선택한 답

    // 정답 비교
    if (selectedAnswer === randomMission.correct) {
      // 정답일 경우 사용자 레벨을 증가시킴
      user.level += 1;

      // 미션 완료 목록에 해당 미션 추가
      user.missionCompleted = user.missionCompleted || [];
      user.missionCompleted.push(randomIndex);

      await user.save();

      return res.status(200).json({
        message: "정답입니다! 레벨이 올라갔습니다.",
        mission: randomMission,
        newLevel: user.level,
      });
    } else {
      return res.status(200).json({
        message: "틀렸습니다. 다시 시도해 주세요.",
        mission: randomMission,
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "문제를 처리하는 중 오류가 발생했습니다." });
  }
};

module.exports = { mission };
