if( process.env.NODE_ENV!= "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); // Ensure this exists
const session = require("express-session")
const flash = require("connect-flash")
const passport  = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const MongoStore = require('connect-mongo');



const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/reviews.js")
const userRouter = require("./routes/user.js")



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("public"));

const DB_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(DB_URL);
}

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));


  const store = MongoStore.create({
    mongoUrl : DB_URL,
    crypto : {
      secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
  }) 

  store.on("error" ,() =>{
    console.log("Error in mongo session store" , err)
  })

const sessionOption = {
  store,
  secret :process.env.SECRET,
  resave:false,
  saveUninitialized : true,
  cookie :{
    expires : Date.now() + 1 * 24 * 60 * 60 * 1000,
    maxAge : 1 * 24 * 60 * 60 * 1000,
    httpOnlu : true,
  }
}






app.get("/", (req, res) => {
  res.redirect("/listings"); // Redirect to listings page
});



app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport .serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) =>{
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.currUser = req.user;
  next();
})

app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter)
app.use("/" , userRouter);





// Catch-all for undefined routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
