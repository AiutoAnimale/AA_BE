const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  // authorization 헤더가 없을 경우
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  // Bearer 토큰에서 'Bearer'를 제거하고 토큰만 가져오기
  const tokenParts = token.split(' ');

  // Bearer가 없거나 두 번째 값이 없다면 유효하지 않음
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: "잘못된 토큰 형식입니다." });
  }

  const tokenValue = tokenParts[1];

  // JWT 토큰 검증
  jwt.verify(tokenValue, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }

    // decoded 정보를 req.user로 설정
    req.user = decoded; // req.decoded 대신 req.user 사용
    next(); // 다음 미들웨어로 진행
  });
}

module.exports = authenticationMiddleware;
