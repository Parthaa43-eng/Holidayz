const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js")
const Review = require("../models/review.js")

const {isLoggedIn}  = require("../middleware.js")

const reviewController = require("../controllers/reviews.js")


const validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
      return res.status(400).json({ error: error.details }); 
    }
    else{
      next();
    }
  }

router.post("/" ,validateReview , isLoggedIn ,  wrapAsync (reviewController.addReview))  //Reviews
router.delete("/:reviewId", isLoggedIn ,  wrapAsync(reviewController.destroyReview));//Delete reviews route  

module.exports = router;