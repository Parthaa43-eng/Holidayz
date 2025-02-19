const Review = require("../models/review.js")
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js"); // Ensure this exists


module.exports.addReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id) ;
    let newReview = new Review(req.body.review);
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" , "New review added!")
    res.redirect(`/listings/${listing._id}`);
  
  
  
  }


module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review deleted!")
    
    res.redirect(`/listings/${id}`);
  }