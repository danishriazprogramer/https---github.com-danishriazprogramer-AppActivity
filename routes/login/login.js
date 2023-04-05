const express=require("express");
const login=express.Router();
const  user=require("../../models/register/registerSchema")
const phoneNumberUser=require("../../models/phoneRegister/registerWithNumberSchema")
const cookieparser=require("cookie-parser")
login.use(cookieparser());
const BodyParser= require("body-parser");
login.use(express.json());
login.use(express.urlencoded({extended:false}));


//login with email api
login.post("/login", async (req, resp, next) => {

    try {
        user.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                //handle error here
            }

            //if a user was found, that means the user's email matches the entered email
            if (user) {
                resp.send(user)
            } else {


                var err = new Error('the user with that email not registered. Please Please register First..')
                resp.send(`${err}`)
                err.status = 400;
                return next(err);
            }
        });

    } catch (e) {
        console.log(e)
    }

})




//login with Phone number api
login.post("/loginWithNumber", async (req, resp, next) => {

    try {
        phoneNumberUser.findOne({ phoneNumber: req.body.phoneNumber }, function (err, number) {
            if (err) {
                //handle error here
            }

            //if a user was found, that means the user's phone number matches the entered phone number
            if (number) {
                resp.send(number)
            } else {


                var err = new Error('the user with that phone number not registered. Please Please register First..')
                resp.send(`${err}`)
                err.status = 400;
                return next(err);
            }
        });

    } catch (e) {
        console.log(e)
    }

})




module.exports = login;