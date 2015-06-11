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
	db.Actor.find({}, function(error, actors){
		response.render("actors/index", {actorObject:actors});	// pass in info here {___:___}
		// no leading / when it's a file, only when it's a route
	})
});

// on route '/actors/new' show new.ejs
// this MUST come before 'actors/:id'
app.get("/actors/new", function(request, response){
	response.render("actors/new");
});

// on post from ACTION on /actors/new, which is /actors, do stuff, redirect to /actors
// post the info on /actors
app.post("/actors", function(request, response){
	db.Actor.create(request.body.actorObject, function(){
		response.redirect("/actors");   
	})
});

// on route '/actors/:id' show show.ejs
// findById(request.params.id, ...)
app.get("/actors/:id", function(request, response){
	db.Actor.findById(request.params.id, function(error, foundActor){
		if(error){
			throw error;
		} else {
			response.render("actors/show", {actorObject:foundActor});
		}
	});
});

// on route /actors/:id/edit, show edit.ejs
app.get("/actors/:id/edit", function(request, response){
	db.Actor.findById(request.params.id, function(error, foundActor){
		if(error){
			throw error;
		} else {
			response.render("actors/edit", {actorObject:foundActor});
		}
	})
});

// on put from /actors/:id, do stuff, redirect to /actors
// findByIdAndUpdate(request.params.id, ...)
app.put("/actors/:id", function(request, response){
	db.Actor.findByIdAndUpdate(request.params.id, request.body.actorObject, function(error, foundActor){
		response.redirect("/actors"); 
	})
});

// on delete from /actors/:id, do stuff, redirect to /actors
// findByIdAndDelete(request.params.id, ...)
app.delete("/actors/:id", function(request, response){
	db.Actor.findByIdAndRemove(request.params.id, function(error, foundActor){
		response.redirect("/actors");
	})
});


// show 404 in case of any missing pages
app.get("*", function(request, response){
	response.render("errors/404");
});

// START SERVER
app.listen(3000, function(){
	console.log("Server starting on port: 3000");
});
