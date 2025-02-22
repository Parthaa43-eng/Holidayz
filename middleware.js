const Review  = require("./models/review.js")


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

module.exports.isReviewAuthor = async(req,res,next) =>{
  let {id , reviewId} = req.params;
  let review = await Review.findById(reviewId)

  if(!review.author.equals(res.locals.currUser._id)) {
    req.flash("error" , "You are not the author of this review!!")
    return res.redirect(`/listings/${id}`) 
  }

  next();
}