var express = require('express')
var router = express.Router()
const {signout}  = require("../controllers/auth")

// const signout = (req, res) => {
//     res.send("user signout success")
// };


router.get("/signout", signout);

module.exports = router;