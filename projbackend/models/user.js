import mongoose from 'mongoose';
//or
//const mongoose = require('mongoose');    this is common JS syntax
const crypto = require('crypto');

// import { v4 as uuidv4 } from 'uuid';
// uuidv4();

const uuidv1 = require('uuid/v1');



  //var Schema = mongoose.Schema;
  //or
  const { Schema } = mongoose;

  const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true

    },
   
    encry_password: {
        type: String,
        required: true

    },
    salt: String,

    role: {
        type: Number,
        default: 0

    },
    purchases: {
        type: Array,
        default: []

    }

  }, {timestamps:true}
  );

  userSchema.virtual("password")
        .set(function(password){
            this._password = password
            this.salt = uuidv1();
            this.encry_password = this.securePassword(password);
        })

        .get(function(){
            return this._password
        })


  userSchema.method = {

      authenticate: function(plainPassword){
          return this.securePassword(plainPassword) === this.encry_password
        },

      securePassword: function(plainPassword){
          if (!password) return "";
          try {
              return crypto
              .createHmac('sha256', this.salt)
              .update(plainPassword)
              .digest('hex');
          } catch (err) {
              return "";
          }
      }
  }

//module can export things
  module.exports = mongoose.model("User",userSchema)