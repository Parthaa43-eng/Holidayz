const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });



module.exports.index = async (req, res) => {

  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListings = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing does not exist");
    res.redirect("/listings");
    return;
  }
//   console.log("Current User ID:", req.user._id);
// console.log("Admin ID from .env:", process.env.ADMINID);
// console.log("User ID as String:", req.user._id.toString());


  res.render("./listings/show.ejs", { listing , currUser: req.user });
};

module.exports.createListing = async (req, res, next) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
  let url = req.file.path;
  let filename = req.file.filename; 
  const newListing = new Listing(req.body.listing);
  newListing.amenities = req.body.amenities || [] ;
  newListing.owner = req.user._id;
  newListing.image = {url , filename};

  newListing.geometry = response.body.features[0].geometry ; 
  
   await newListing.save();

  req.flash("success", "Ban gai bhai new listing !!!!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (listing.owner.equals(req.user._id) || req.user._id.toString() === process.env.ADMINID) {
    res.render("./listings/edit.ejs", { listing });
    
  }
 else{
  req.flash("error", "You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
 }
 
};

module.exports.updateListing = async (req, res, next) => {
  
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (listing.owner.equals(req.user._id) ||  req.user._id.toString() === process.env.ADMINID) {
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    updatedListing.amenities = req.body.amenities || [];
    if(typeof req.file !== 'undefined') {
      let url = req.file.path;
      let filename = req.file.filename;
      updatedListing.image = {url , filename}
      console.log(process.env.ADMIN);
      await updatedListing.save();
    }
  
   
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
  }

  else{
    req.flash("error", "You do not have permission to update this listing!");
    return res.redirect(`/listings/${id}`);
  }
};

module.exports.deleteListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

 

  if (listing.owner.equals(req.user._id) || req.user._id.toString() === process.env.ADMINID) {
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
} else {
    req.flash("error", "You don't have permission to delete this listing!");
    res.redirect(`/listings/${id}`);
}

 
};

