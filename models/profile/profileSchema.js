const mongoose=require("mongoose");
const profileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  
  age: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true
  },
  professtion: {
    type: String,
    required: true
  },
  married: {
    type: String,
    required: true
  } 

 })

 module.exports = mongoose.model("profile", profileSchema)