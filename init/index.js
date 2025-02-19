const mongoose = require("mongoose")
const data = require("./data")
const Listing = require("../models/listing.js");

async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/Holidayz")
  
}

main()
 .then( ()=> { console.log("Connected") })
.catch((err) => console.log(err));

const  initDb = async () => {
    await Listing.deleteMany({});
    data.data = data.data.map((obj) => ({...obj , owner : "67b1c297a9063fad27c0df32"}))
    await Listing.insertMany(data.data)
    console.log("Database Initialize")

}

initDb();   