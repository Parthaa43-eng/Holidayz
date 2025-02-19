const User = require("../models/user.js")

module.exports.signInUser = async(req,res) =>{
    try {
        let {username , email , password} = req.body;
        const newUser =  new User ({email,username})
        const regUser = await User.register(newUser , password);
        req.login(regUser , (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success" , "Welcome to Holidayz!!")
            res.redirect("/listings")
        })
       
    } catch (error) {
        req.flash("error" , error.message)
        res.redirect("/signup")
    }
}

module.exports.logInUser = (req, res) => {
    try {
        req.flash('success', 'Logged in successfully');
        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl); 
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/login');
    }
}

module.exports.logOutUser = (req,res , next) =>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
       
        req.flash("success" , "Logged out!!")
        res.redirect("/listings")
    })
}
