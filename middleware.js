module.exports.isLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl; // Save the URL the user wanted to visit
      req.flash("error" , "Please login first")

        return res.redirect("/login");
      }
      next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
}