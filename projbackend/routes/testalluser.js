const express = require("express")
const router = express.Router()   

const {getAllUser} = require("../controllers/testalluser")

router.get("/user",getAllUser);


module.exports = router;