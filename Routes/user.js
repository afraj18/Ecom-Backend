const router = require("express").Router()

router.get("/user", (req, res) => {
    console.log("Success")
})

module.exports = router;