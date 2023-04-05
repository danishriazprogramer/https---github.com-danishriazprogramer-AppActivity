const express=require("express")
const profile=express.Router();

const userProfile=require("../../models/profile/profileSchema")


profile.post("/profile", async (req, resp, next) => {

  try {
    console.log("ok ha sub")
    const profileData = new userProfile(req.body)
             await profileData.save();
             resp.send(profileData)
        next()

  } catch (e) {
      console.log(e)
  }

})



module.exports=profile;