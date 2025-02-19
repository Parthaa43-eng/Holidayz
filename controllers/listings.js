const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });



module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
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

  res.render("./listings/show.ejs", { listing });
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

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
  }

  res.render("./listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res, next) => {
  
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to update this listing!");
    return res.redirect(`/listings/${id}`);
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if(typeof req.file !== 'undefined') {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = {url , filename}
    await updatedListing.save();
  }

  



 
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to delete this listing!");
    return res.redirect(`/listings/${id}`);
  }

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted !!!!");
  res.redirect("/listings");
};
