const express=require("express");
const forgotPassword=express.Router();
const  registerWithNumber=require("../../models/phoneRegister/registerWithNumberSchema")
const  forgotPasswordToken=require("../../models/forgotPassword/forgotPasswordTokenSchema")
const user=require("../../models/register/registerSchema")
const jwt =require("jsonwebtoken")
const cookieparser=require("cookie-parser")
const session = require('express-session');
const { set } = require("mongoose");
const MongoStore = require('connect-mongo')(session);

// forgotPassword.use(cookieparser());
// const BodyParser= require("body-parser");
// forgotPassword.use(express.json());
// forgotPassword.use(express.urlencoded({extended:false}));

// forgotPassword.use(session({
//     secret: 'SECRET KEY',
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({
//         url: 'mongodb+srv://danishriazprogramer:F3XL60EbZUzJGHV7@cluster0.fzjs5cn.mongodb.net/test',
//         ttl:  1,
//         expires: new Date(Date.now() + 50),
//         autoRemove: 'native',
//         collection:"forgotPasswordToken",
//         cookie:{maxAge:60*60}
//     })
// }));

forgotPassword.post("/setForgotPassword", async(req,resp,next)=>{
    try {
       const token=req.cookies.JsonWEbToken;
       const email=req.cookies.email;
      const getToken=  await forgotPasswordToken.find({token:req.body.token})
        console.log(token)
        console.log(email)
      const getUser= await user.findOne({email:req.cookies.email});
      console.log(getUser)
    
            //   const saltRounds = 10;
            //  const passwodhas= await bcrypt.hash(req.body.password, saltRounds)     
            // //  let getUserId=getUser._id;
            // //  console.log(getUser._id)

            // console.log("the hash password",passwodhas)

                    
           let doc = await user.findOneAndUpdate({email, password:req.body.password});
           const getUserpassword= await user.findOne({email:req.cookies.email});
        
       
        resp.send(getUserpassword)
        return next();
     
    } catch (error) {
        
    }
})


// forgot password api with email
forgotPassword.post("/forgotPassword", async(req,resp,next)=>{
    try {
        user.findOne({ email: req.body.email }, function (err, user) {
            

            //if a user was found, that means the user's email matches the entered email
            if (user) {
                const token= jwt.sign({_id:this._id},"hyudggysgyydg63f0a41a4a98ee651fe2a01a");
 
                resp.cookie("JsonWEbToken", token,{

                    expires: new Date(Date.now() + 1000*60*60*24),
                    httpOnly: true,
                    
                  })
                  resp.cookie("email", req.body.email,{

                    expires: new Date(Date.now() + 1000*60*60*24),
                    httpOnly: true,
                    
                  })
                  const FPToken = new forgotPasswordToken({
                    token: token,
                   
                  })
                  const register=FPToken.save();
                  resp.send("ok you can change the password go set password Api")
                


            } else {
                var err = new Error('the user with that email not registered. Please Please register First..')
                resp.send(`${err}`)
                err.status = 400;
                return next(err);
            }
        });

        // set forgot passwod api

       

    } catch (e) {
        console.log(e)
    }



})




forgotPassword.get("/abc",(req,resp)=>{
    resp.send("ok ha sun the abc api woring good")
})






module.exports = forgotPassword;