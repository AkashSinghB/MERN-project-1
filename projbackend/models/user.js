import mongoose from 'mongoose';

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
    //TODO: come back here
    password: {
        type: String,
        trim: true

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

  });

//module can export things
  module.exports = mongoose.model("User",userSchema)