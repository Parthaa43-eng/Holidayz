const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn}  = require("../middleware.js")

const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const listingController = require("../controllers/listings.js")


router.route("/")
.get( wrapAsync(listingController.index) ) // index
.post(isLoggedIn ,upload.single('listing[image]'),   wrapAsync(listingController.createListing)); // Create Route

router.get("/new",isLoggedIn , listingController.renderNewForm); // Add new Listing

router.route("/:id")
.get( wrapAsync(listingController.showListings) ) // Show route
.put(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.updateListing)) // Update Route
.delete(isLoggedIn , wrapAsync(listingController.deleteListing))// Delete Route



 



router.get("/:id/edit", isLoggedIn ,  wrapAsync(listingController.editListing));   // Edit Route


  module.exports = router;