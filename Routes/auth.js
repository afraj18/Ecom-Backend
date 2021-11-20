const router = require("express").Router()
const User = require("../model/User")
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

// REGISTRATION
router.post('/register', async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }



});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        })

        !user && res.status(401).json("Wrong User Name! ")

        const hashedpwd = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalpwd = hashedpwd.toString(CryptoJS.enc.Utf8)

        const inputpwd = req.body.password;

        originalpwd != inputpwd &&
            res.status(401).json("Wrong Credential! ")
        const { password, ...others } = user._doc;
        res.status(200).json(others);

    }
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router