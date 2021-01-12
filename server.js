const express = require("express");
const cors = require("cors");
require("dotenv").config({path: "./config/config.env"});
const passport = require("passport");
const expressSession = require('express-session')
const models = require("./models");

const authRoute = require("./routes/auth.routes");
const tutorialsRoute = require("./routes/tutorial.routes");
const { protect } = require("./middlewares/services/authentication_client");
const { authorize } = require("./middlewares/services/authorization_client");


//  initailize application
const app = express();

//  sync data with sequelize
// models.sequelize.sync({ force: true});

//  cross origin resource sharing 
app.use(cors());

//  create express session 
app.use(expressSession( {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

//  passport config
require("./config/passport")(passport);

//  initialize passport 
app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//  routes

//  user routes
app.use("/api/v1/auth", authRoute);

// tutorial routes
// app.use("/api/v1/tutorials", protect, authorize('user', 'publisher', 'admin'), tutorialsRoute)
app.use("/api/v1/tutorials", protect, authorize('user','publisher', 'admin'), tutorialsRoute)


app.use((err, req, res, next)=>{
  // console.log("in error handler", JSON.stringify(err.message));
  res.json({
    error: err.message
  })
})

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});