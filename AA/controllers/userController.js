const dotenv = require('dotenv').config(); // .env 파일 로드
const bcrypt = require("bcrypt");
const { User } = require('../models');
const jwt = require("jsonwebtoken");
const multer = require("multer"); // Multer 모듈 로드
const path = require('path'); // Path 모듈 로드
const cors = require('cors');

const signup = async (req, res) => {
    const { userid, userpw, nickname, pet_name, pet_sex, species, pet_birth, region } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(userpw, 10);  
        const existUser = await User.findOne({ where: { userid } });
        const existUserNick = await User.findOne({ where: { nickname } });

        if (existUser) {
            return res.status(409).json({ message: "중복된 아이디입니다." });
        }

        if (existUserNick) {
            return res.status(409).json({ message: "중복된 닉네임입니다." });
        }

        await User.create({
            userid,
            userpw: hashedPassword,
            nickname,
            pet_name,
            pet_sex,
            species,
            pet_birth,
            region,
            level: '0',
        });

        return res.status(201).json({ message: "회원가입에 성공했습니다." });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });
    }
};

const login = async (req, res) => {
    const { userid, userpw } = req.body;

    try {
        const thisUser = await User.findOne({ where: { userid } });

        if (!thisUser) {
            return res.status(404).json({ message: "존재하지 않는 아이디입니다." });
        }

        const isPassword = await bcrypt.compare(userpw, thisUser.userpw);

        if (!isPassword) {
            return res.status(409).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        const accessToken = jwt.sign({ userid: thisUser.userid }, process.env.SECRET, { expiresIn: "1h" });

        await thisUser.update({ token: accessToken });

        return res.status(201).json({ message: "로그인에 성공했습니다.", accessToken });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });
    }
};

const logout = async (req, res) => {
    const { userid } = req.decoded;

    try {
        if (!userid) {
            return res.status(401).json({ message: "로그인이 필요합니다." });
        }

        const thisUser = await User.findOne({ where: { userid } });

        if (!thisUser) {
            return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        }

        await thisUser.update({ token: null });

        return res.status(200).json({ message: "로그아웃에 성공했습니다." });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });
    }
};

const getUser = async (req, res) => {
    const { userid } = req.decoded;

    try {
        const thisUser = await User.findOne({ where: { userid } });

        if (!thisUser) {
            return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
        }

        return res.status(200).json({
            userid: thisUser.userid,
            nickname: thisUser.nickname,
            pet_name: thisUser.pet_name,
            pet_sex: thisUser.pet_sex,
            species: thisUser.species,
            pet_birth: thisUser.pet_birth,
            region: thisUser.region,
            level: thisUser.level
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });
    }
};

const updateUser = async (req, res) => {
    const userid = req.decoded.id;
    const newName = req.body.nickname;

    try {
        const thisUser = await User.findOne({ where: { userid } });

        if (!thisUser) {
            return res.status(404).json({ message: "존재하지 않는 계정입니다." });
        }

        await thisUser.update({ nickname: newName });

        return res.status(200).json({ message: "업데이트에 성공했습니다." });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });
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

const uploadProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const findUser = await User.findOne({ where: { token } });

        if (!findUser) {
            return res.status(401).json({ message: "로그인 후 이용이 가능합니다." });
        }

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
    signup,
    login,
    logout,
    getUser,
    updateUser,
    uploadProfile // 충돌 해결 후 uploadProfile 추가
};
