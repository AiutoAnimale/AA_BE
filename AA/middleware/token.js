const jwt = require("jsonwebtoken");

function authenticationMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  console.log(req.headers)

  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  const data = token.split(' ');

  jwt.verify(data[1], process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    }
    req.decoded = decoded;
    next();
  });
}

module.exports = authenticationMiddleware;