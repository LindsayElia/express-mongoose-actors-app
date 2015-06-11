var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/actors_app"); // tell it what database to use to save data
mongoose.set("debug", true); // use this to show logging info in terminal for debugging

module.exports.Actor = require("./actor"); // export the actor.js file as a module to use in our other files
// QUESTION - WHY THIS AND ALSO AN ACTOR.JS FILE? DOES MONGOOSE OR EXPRESS NEED A DEFAULT INDEX.JS FILE ?