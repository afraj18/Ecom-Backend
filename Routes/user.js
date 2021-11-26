const cryptoJs = require("crypto-js");
const User = require("../model/User");
const { verifyToken, verifyAndAuthorization } = require("./verifyToken");

const router = require("express").Router()
//Update
router.put("/:id", verifyAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC)
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updateUser)
    }
    catch (err) {
        return res.status(500).json(err)
    }
});
module.exports = router;