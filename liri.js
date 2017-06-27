
	
//global variables:
var fs = require("fs");
var tk = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter({
consumer_key: tk.twitterKeys.consumer_key,
consumer_secret: tk.twitterKeys.consumer_secret,
access_token_key: tk.twitterKeys.access_token_key,
access_token_secret: tk.twitterKeys.access_token_secret,
});
var request = require("request");
var argv = process.argv;
var movieWords = "";
var sep = "";
var sep2 = "";
var rottenTurl = "";
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
	id: "b186e3b489564b47ae52fe55bfc92a6e",
	secret: "9b7091dbd1064c0db44445bee55881db"
});
// var txtfile = require("./log.txt");
// fs.appendFile("log.txt", " " + argv + " ", function(err){
// 	if (err) {
// 		console.log(err);
// 	}
// });
if (argv[2] == "movie-this") {
	movieThis();
}

if (argv[2] == "spotify-this-song")	{
	spotThis();
}

if (argv[2] == "do-what-it-says") {
	whatItDo();
};

if (argv[2] == "my-tweets"){
	tweets();
};
     // * Artist(s)
     // * The song's name
     // * A preview link of the song from Spotify
     // * The album that the song is from
		function spotThis(movieWords){
					for (var i = 3; i < argv.length; i++) {
					movieWords += sep + argv[i];
					sep = "+";//combines the words that make up a title to finish request URL to ombdiapi.com
					}	
				spotify.search({type:"track", query: movieWords}, function(err, response){
				if(err) {
					return console.log(err);
				}
				//for (var i = 0; i < response.tracks.items.album[0].artists.length; i++){
						var songData = response.tracks.items;
						//console.log("songData: " + JSON.stringify(songData[0]));
						console.log("Artist: " + songData[0].artists[0].name);
						console.log("Song Title: " + songData[0].name);
						console.log("Album Title: " + songData[0].album.name);
						console.log("Song Preview: " + songData[0].preview_url);
						console.log("Additional Preview?: " + JSON.stringify(songData[0].artists[0].external_urls.spotify));
						//the additional preview was added when I thought all of my song previews were returning null. In the event someone wanted to use it to actually hear the song I decided to include it. Functionality is important to me.
				//}

					
				
			});
		};
		function movieThis() {
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
		  	}//rottenTurl fills in the rottentomatoes url below. I'm sure there's a way to get this from the omdbapi but this works until rottentomatoes changes their dir paths/file routing
		  	//console.log(movieWords);
			// Then plugin movieWords var 
			request("http://www.omdbapi.com/?t=" + movieWords + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

			  // If the request is successful (i.e. if the response status code is 200 and there's no reportable error, console.log as shown below)
				if (!error && response.statusCode === 200) {
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

		function whatItDo(){//read from random.txt, split the two strings into an array of two strings, index 0 being argv[2] and 1 being argv[3] as query parameter for spotThis.
	  		fs.readFile("random.txt", "utf8", function(error, data){
	    	var txt = data.split(',');
	    	movieWords = txt[1];
	    	spotThis(movieWords);
	  });
	};

		function tweets() {//client = get keys from keys.js, params = twitter Screen Name
			var params = {screen_name: 'limezZublime'};
  			client.get('statuses/user_timeline', params, function(error, tweets, response) {
    			if (!error) {
      			for (var i = 0; i < tweets.length; i++) {
      				//console.log(response);
        			console.log(tweets[i].text);
        			console.log(tweets[i].created_at);
      }
 	 }
	});
};
