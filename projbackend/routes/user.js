const express = require("express")
const router = express.Router()     


const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")

//middleware populated look for this id and populate everything in req.profile
router.param("uId",getUserById)

router.get("/user/:uId",isSignedIn, isAuthenticated, getUser)
router.put("/user/:uId",isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:uId",isSignedIn, isAuthenticated, userPurchaseList);



module.exports = router;
