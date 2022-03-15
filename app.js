const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://jamieleeg:aesBw39YZFnbGvU@cluster0.waagn.mongodb.net/portfolioDB", {
  useNewUrlParser: true
});

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

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){

  res.render("home");
});

app.get("/projects", function(req, res){

  res.render("projects");
});

app.get("/contact", function(req, res){

  res.render("contact");
});

app.post("/home", function(req, res){
  res.render("home");
});

app.post("/contact", function(req, res){

  const post = new Post({
    name: req.body.name,
    email: req.body.emailAddress,
    message: req.body.message
  });
  post.save(function(err) {
    if(!err){
      res.redirect("/");
    }
  });
});

let port = process.env.PORT || 3000;


app.listen(port, function() {
  console.log("Server started on port " + port);
});
