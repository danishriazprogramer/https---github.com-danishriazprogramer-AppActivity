const mongoose = require("mongoose");
const BcryptJS=require("bcryptjs")
const jwt=require("jsonwebtoken")

const phoneNumberUserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weather: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  tokens:[{
    token: {
      type: String,
      required: true
    }
  }]
  

 })



 //json web token genration code


 phoneNumberUserSchema.methods.generateToken = async function () {
  try {
   
          
  const token= await jwt.sign({_id:this._id},"hyudggysgyydg63f0a41a4a98ee651fe2a01a");
  console.log(token)
     this.tokens= this.tokens.concat({token});
    await this.save();
   return token;
   //   const varify= await jwt.verify(jsonwebtoken,"hyudggysgyydg63f0a41a4a98ee651fe2a01a");
   //   console.log(varify)
            
     
  }catch(e){
    console.log(e)
  }
  
  }
  

//password encyraption code 
phoneNumberUserSchema.pre("save", function (next) {
  const user = this
          console.log("passwod is save in encripction")
  if (this.isModified("password") || this.isNew) {
    BcryptJS.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        BcryptJS.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

 module.exports = mongoose.model("registerWithNumber", phoneNumberUserSchema)