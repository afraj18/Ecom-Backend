const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(402).json("Token is not valid")
            }
            req.user = user
            next()
        })
    }
    else {
        return res.status(401).json("You are not authenticated")
    }
}
const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            return res.status(403).json("You are not allowed function this")
        }
    })
}

const verifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            return res.status(403).json("You are not allowed function this")
        }
    })
}
module.exports = {
    verifyToken,
    verifyAndAuthorization,
    verifyAndAdmin
}