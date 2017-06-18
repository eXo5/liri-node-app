

//global variables:
var fs = require("fs");
var tk = require("./keys.js");
var twitterKeys = tk.twitterKeys;
var request = require("request");
var argv = process.argv;
var movieWords = "";
var sep = "";
var sep2 = "";
var rottenTurl = "";
//var spotfiy = require("spotify");

	if (argv[2] == "movie-this") {
		movieThis(movieWords);
	}
		function movieThis(movieWords) {
		for (var i = 3; i < argv.length; i++) {
		movieWords += sep + argv[i];
		sep = "+";//combines the words that make up a title to finish request URL to ombdiapi.com
		rottenTurl += sep2 + argv[i];
		sep2 = "_";//rottenTurl finishes the url for Rotten Tomatoes.
		}
		//console.log(movieWords);

		if (argv[3] === undefined) { 
		movieWords = "mr+nobody";
		rottenTurl = "mr_nobody";
	  	}
	  	//console.log(movieWords);
		
		
	// Request to the OMDB API with the movie specified
	// function consoleLog(movieWords){ 
	request("http://www.omdbapi.com/?t=" + movieWords + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	//not nested

		console.log("The movie's title: " + JSON.parse(body).Title + ".");
	   	console.log("The movie " + JSON.parse(body).Title + " was released in " + JSON.parse(body).Year + ".");
	    console.log(JSON.parse(body).Title + " received a rating of " + JSON.parse(body).imdbRating + " from IMDB.");
	    console.log(JSON.parse(body).Title + " was produced in " + JSON.parse(body).Country + ".");
	    console.log(JSON.parse(body).Title + " was originally shot in " + JSON.parse(body).Language + ".");
	    console.log(JSON.parse(body).Title + "'s plot: " + JSON.parse(body).Plot);
	    console.log(JSON.parse(body).Title + " has a celestial cast of: " + JSON.parse(body).Actors + ".");
	    console.log(JSON.parse(body).Title + "'s Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + rottenTurl);


	  	};

	  });
	};

// };

// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     // Do something with 'data' 
// });