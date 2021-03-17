var express = require('express')
var router = express.Router()
const {signup, signout}  = require("../controllers/auth")

// const signout = (req, res) => {
//     res.send("user signout success")
// };

router.post("/signup", signup);
router.get("/signout", signout);

module.exports = router;