require("dotenv").config();

// GET KEYS.JS & ANY ADDITIONAL REQUIRED FILES & PACKAGES -
let keys = require("./keys.js");
let request = require("request");
let Twitter = require('twitter');
let Spotify = require('node-spotify-api')

// SPOTIFY API -------------------------------------------
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

// GRABBING COMMAND LINE VALUES --------------------------
let command = process.argv[2];
let media = process.argv[3];

// TWITTER COMMANDS ---------------------------------------
if (command === 'my-tweets') {
  console.log(client);
  let params = {screen_name: 'britney76944406'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
}

// SPOTIFY COMMANDS --------------------------------------
if (command === 'spotify-this-song') {
  spotify.search({ type: 'track', query: `${media}`, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log("The name of the song is: " + data.tracks.items[0].name);
  console.log("The artist's name is: " + data.tracks.items[0].album.artists[0].name);
  console.log("The album name of this song is: " + data.tracks.items[0].album.name);
  console.log("The URL to listen to this song: " + data.tracks.items[0].album.external_urls.spotify);
  });
}

// MOVIE COMMANDS ----------------------------------------
if (command === 'movie-this') {
  request(`http://www.omdbapi.com/?t=${media}&y=&plot=short&apikey=trilogy`, function(error, response, content) {
    if (!error && response.statusCode === 200) {
      console.log("The title of the movie is: " + JSON.parse(content).Title);
      console.log("The year this movie released: " + JSON.parse(content).Released);
      console.log("The movie's IMDB rating is: " + JSON.parse(content).imdbRating);
      console.log("The movie's Metascore is: " + JSON.parse(content).Metascore);
      console.log("The movie's production took place in: " + JSON.parse(content).Country);
      console.log("The movie's language is: " + JSON.parse(content).Language);
      console.log("The movie's plot is: " + JSON.parse(content).Plot);
      console.log("The actors who played in this movie are: " + JSON.parse(content).Actors);
    } else {
      return error;
    }
  });
}

// RANDOM COMMANDS ------------------------------------------
if (command === 'do-what-it-says') {

}
