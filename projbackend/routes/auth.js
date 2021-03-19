var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const {signup, signout,signin,isSignedIn}  = require("../controllers/auth");


// const signout = (req, res) => {
//     res.send("user signout success")
// };

//data validation in routes
router.post("/signup",
check('name').isLength({ min: 3 }).withMessage('name must be at least 3 chars long'),
check('email').isEmail().withMessage('email required'),
check('password').isLength({min:3}).withMessage('password should be atleast 3 char'),
signup
);

router.post("/signin",
check('email').isEmail().withMessage('email is required'),
check('password').isLength({min:3}).withMessage('password field is required'),
signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req,res) => {
    res.json(req.auth);
})

module.exports = router;