var mongoose = require("mongoose");

var actorSchema = new mongoose.Schema({
	name: String,
	bodyOfWork: String,
	headshot: String
});

var Actor = mongoose.model("Actor", actorSchema);
module.exports = Actor;