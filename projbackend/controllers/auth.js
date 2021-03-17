const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expJwt = require('express-jwt');


exports.signup = (req,res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(422).json({ errors: 
        {
            message:errors.array()[0].msg,
            param:errors.array()[0].param
        }
    });     //error 422 when error coming from backend or database
  }

   const user = new User(req.body)
   user.save((err, user) => {
    if(err){
        return res.status(400).json({
            err: "Not able to save user in DB"
        })
    }
    res.json({
        name: user.name,
        email: user.email,
        id : user._id
    });
   });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: 
            {
                message:errors.array()[0].msg,
                param:errors.array()[0].param
            }
        });
    }

    User.findOne({email}, (err,user) => {
        if(err || !user){
            res.status(400).json({
                error: "User email does not exits"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        //put token in cookie
        res.cookie("token",token, {expire: new Date() + 9999});

        //send response to front end
        const {_id, name , email,role} = user;
        return res.json({
            token,user: {_id,name,email,role}
        });

    });
};

exports.signout = (req, res) => {
    res.json({
       message: "User Sign Out"
    });
};
