const express=require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser=require("body-parser")
const port=4000;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//Db connection
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true ,     
}
mongoose.connect("mongodb+srv://danishriazprogramer:F3XL60EbZUzJGHV7@cluster0.fzjs5cn.mongodb.net/test",connectionParams)
.then(() => console.log('Connected!'));


//require routes
const register=require("./routes/register/register")
const login=require("./routes/login/login")
const forgotPasswod=require("./routes/forgotPassword/forgotPassword")
const profie=require("./routes/profile/profile")


app.use("", register);
app.use("", login);
app.use("", forgotPasswod);
app.use("", profie);


app.listen(port,()=>{
console.log('server stated on port :>> ', port);
});



