const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {
  check,
  validationResult
} = require("express-validator");
require("dotenv").config();
require("./public/js/initDB")();


//create the schema
const postSchema = {
  name: String,
  email: String,
  message: String
};

//Posts collection
const Post = mongoose.model("Post", postSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {

  res.render("home");
});

app.get("/projects", function(req, res) {

  res.render("projects");
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    data: {}
  });
});

app.post("/home", function(req, res) {
  res.render("home");
});

app.post("/contact",

  //name validator
  check("name", "Name required").trim().notEmpty().matches(/^[a-zA-Z ]*$/).withMessage("Only Characters with white space are allowed"),

  //email validator
  check("email", "Email address required").notEmpty().normalizeEmail().isEmail().withMessage("Must be a valid email address"),


  (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return res.status(422).jsonp(errors.array())
      const alert = errors.array()
      res.render("contact", {
        alert,
        data: req.body
      })
    } else {

      const post = new Post({
        name: req.body.name,
        email: req.body.emailAddress,
        message: req.body.message
      });
      post.save(function(err) {
        if (!err) {
          res.redirect("/");
        }
      });
    }
  });

let port = process.env.PORT || 80;


app.listen(port, function() {
  console.log("Server started on port " + port);
});
