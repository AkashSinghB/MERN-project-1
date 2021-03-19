const User = require("../models/user");

exports.getAllUser = (req,res) => {
    User.find((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "no user was found in DB"
            })
        }
        
        return res.json(user)
    })
}