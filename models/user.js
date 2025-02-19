const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // To ensure unique usernames
      },
    email : {
        type : String,
        required : true
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);