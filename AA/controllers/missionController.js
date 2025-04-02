const { Mission, User } = require('../models');

// 랜덤 문제 조회 및 반환
const mission = async (req, res) => {
  try {
    const missionCount = await Mission.count(); // 미션 총 개수 가져오기
    const randomIndex = Math.floor(Math.random() * missionCount) + 1; // 무작위 문제 번호 생성
    const userId = req.user.userid; // 사용자 ID (JWT에서 가져옴)

    // 무작위 미션 조회
    const randomMission = await Mission.findByPk(randomIndex);
    if (!randomMission) {
      return res.status(404).json({ message: "문제를 찾을 수 없습니다." });
    }

    // 문제를 클라이언트에 전달할 데이터 구성
    const missionData = {
      question: randomMission.question,
      answer1: randomMission.answer1,
      answer2: randomMission.answer2,
      answer3: randomMission.answer3,
      answer4: randomMission.answer4,
      missionId: randomMission.idx // 미션 ID 추가
    };

    // 클라이언트에게 문제와 선택지를 전달
    return res.status(200).json({ mission: missionData });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "문제를 처리하는 중 오류가 발생했습니다.", error: error.message });
  }
};

// 답안 제출 및 정답 확인
const checkAnswer = async (req, res) => {
  const { missionId, answer } = req.body; // 클라이언트로부터 미션 ID와 답을 받음

  try {
    // 미션을 찾고 정답 확인
    const mission = await Mission.findByPk(missionId);
    if (!mission) {
      return res.status(404).json({ message: "문제를 찾을 수 없습니다." });
    }

    // 클라이언트의 답이 정답인지 비교
    if (answer === mission.correct) {
      return res.status(200).json({ message: "정답입니다!" });
    } else {
      return res.status(400).json({ message: "오답입니다. 다시 시도해주세요." });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "답을 확인하는 중 오류가 발생했습니다.", error: error.message });
  }
};

module.exports = { mission, checkAnswer };
