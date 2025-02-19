const express = require("express");
const router = express.Router({mergeParams : true}); 

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userControllers = require("../controllers/users.js")

//Signup get
router.get("/signup" , (req,res) =>{
    res.render("./authentication/signup.ejs")
})      

//signup post
router.post("/signup" , userControllers.signInUser)


//Login get
router.get("/login" , (req,res)=>{
    res.render("./authentication/login.ejs");
})

// Login POST
router.post('/login', 
    saveRedirectUrl,
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureFlash: true 
    }), 
    userControllers.logInUser
);


//logout

router.get("/logout" , userControllers.logOutUser )

module.exports = router;