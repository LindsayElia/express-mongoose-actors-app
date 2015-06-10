// REQUIRE MODULES to be used inside of this file
var express = require("express");
var app = express(); // turns express into an object
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var db = require("./models"); // the ./ tells it to look in the same level folder

// SET THE MIDDLEWARE / USE MODULES
app.set("view engine", "ejs");
// app.use(express.static(__dirname + /public));  
// I don't think I need this ^^ until I make a public folder with stylsheets?
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan("tiny")); // call the morgan function, passing 'tiny' in as an argument

// MAKE THE ROUTES

// redirect '/' to /actors to show index
app.get("/", function(request, response){
	response.redirect("/actors");
})

// on route '/actors' show index.ejs
app.get("/actors", function(request, response){
	response.render("actors/index");
});

// on route 'actors/new' show new.ejs
// this MUST come before 'actors/:id'

// on route 'actors/:id' show show.ejs

// on post from actors/:id, do stuff, redirect to /actors


// on route /actors/:id/edit, show edit.ejs


// on post from actors/:id/edit, do stuff, redirect to /actors


// on delete from actors/:id/edit, do stuff, redirect to /actors



// show 404 in case of any missing pages
app.get("*", function(request, response){
	response.render("errors/404");
});

// START SERVER
app.listen(3000, function(){
	console.log("Server starting on port: 3000");
});