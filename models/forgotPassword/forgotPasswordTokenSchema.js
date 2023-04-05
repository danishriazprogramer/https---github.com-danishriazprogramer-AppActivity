const mongoose = require("mongoose");


const forgotPasswordToken = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,// this is the expiry time in seconds
  },
 })

 module.exports = mongoose.model("forgorPassword", forgotPasswordToken)