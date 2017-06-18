var fs = require("fs");
var tk = require("./keys.js");
var twitterKeys = tk.twitterKeys;
var request = require("request");
var movieName = process.argv;
var movieWords = "";
var sep = "";
var sep2 = "";
var rottenTurl = "";
//I made a broken infinite loop and I thought it was funny so I saved it.
if (movieName[2] == "movie-this") {
	for (var i = 3; i < movieName.length; i++) {
			movieWords += sep + movieName[i];
			sep = "+";
			rottenTurl += sep2 + movieName[i];
			sep2 = "_";
	}
}
// Then run a request to the OMDB API with the movie specified
function consoleLog(movieWords){ 
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
  		if (movieWords !== "") {
  			consoleLog(movieWords);
  		}
  		else if (movieWords == "") { 
  			movieWords = "mr.+nobody";
  			rottenTurl = "mr_nobody";
  		consoleLog(movieWords);
  	};

  });

};

consoleLog(movieWords);


// //starting at index two - get each process.argv for the multiple word titled movie..names.
  	//default mr.nobody http://www.imdb.com/title/tt0485947/
//  }
//});
