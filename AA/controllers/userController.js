//controllers/userController.js
const bcrypt = require("bcrypt");
const { User } = require('../models');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const signup = async(req, res) => {
    const { userid, userpw, nickname, pet_name, species, pet_birth, region } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existUser = await User.findOne({
            where: { userid }
        });

        if(existUser) {
            return res.status(409).json({ message: "중복된 아이디입니다."});
        }

        await User.create({
            userid,
            userpw: hashedPassword,
            nickname,
            pet_name,
            species,
            pet_birth,
            region,
        });

        return res.status(201).json({ message: "회원가입에 성공했습니다." });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message : "요청에 실패했습니다." });
    }
}

const login = async(req, res) => {
    const { userid, userpw } = req.body;

    try {
        const thisUser = await User.findOne({
            where: { userid },
        })

        if(!thisUser) {
            return res.status(404).json({ message: "존재하지 않는 아이디입니다." });
        }

        const isPassword = await bcrypt.compare(userpw, thisUser.userpw);

        if(isPassword) {
            return res.status(409).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        const accessToken = jwt.sign(
            { 
                userid: thisUser.userid,
            }, 
            process.env.SECRET, 
            {
                expiresIn: "1h",
            }
        );

        await thisUser.update({
            token: accessToken,
        });

        return res.status(201).json({ message: "로그인에 성공했습니다.", accessToken });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "요청에 실패했습니다." });
    }
}