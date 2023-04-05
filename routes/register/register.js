const express=require("express");
const jwt=require("jsonwebtoken");
const register=express.Router();
const user=require("../../models/register/registerSchema")
const phoneNumberUser=require("../../models/phoneRegister/registerWithNumberSchema")
const cookieparser=require("cookie-parser")
register.use(cookieparser());
const BodyParser= require("body-parser");
register.use(express.json());
register.use(express.urlencoded({extended:false}));

//register with email api
register.post("/", async (req, resp, next) => {

  try {
    const registerUser = new user({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      weather: req.body.weather,
    })
   
    //a simple if/else to check if email already exists in db
    user.findOne({ email: req.body.email }, function (err, email) {
      if (err) {
        //handle error here
      }

      //if a user was found, that means the user's email matches the entered email
      if (email) {
        var err = new Error('A user with that email has already registered. Please use a different email..')
        resp.send(`${err}`)
        err.status = 400;
        return next(err);
      } else {

        const token= registerUser.generateToken();
        const register=registerUser.save();
        typeof(token)

        resp.cookie("JsonWEbToken", token,{

        expires: new Date(Date.now() + 1000*60*60*24),
        httpOnly: true,
        
      })
    
        resp.send(req.body)
      }
    });

  } catch (e) {
    console.log(e)
  }
});

    

//register with number api
register.post("/regiterWithNumber", async (req, resp, next) => {

  try {

    const registerUserWithNumber = new phoneNumberUser({
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      userName: req.body.userName,
      gender: req.body.gender,
      weather: req.body.weather,

    })
    console.log(registerUserWithNumber)
    //a simple if/else to check if Phone Number already exists in db
    phoneNumberUser.findOne({ phoneNumber: req.body.phoneNumber }, function (err, number) {
      if (err) {
        //handle error here
      }

      //if a user was found, that means the user's Phone Number matches the entered Phone Number
      if (number) {
        var err = new Error('A user with that Phone Number has already registered. Please use a different Phone Number..')
        resp.send(`${err}`)
        err.status = 400;
        return next(err);
      } else {
        const token= registerUserWithNumber.generateToken();
        const register = registerUserWithNumber.save();
        typeof(token)

        resp.cookie("JsonWEbToken", token,{

        expires: new Date(Date.now() + 1000*60*60*24),
        httpOnly: true,
        
      })
        
        resp.send(req.body)
      }
    });
  } catch (e) {
    console.log(e)
  }


});


module.exports = register;