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

