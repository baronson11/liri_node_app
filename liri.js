//USING DOTENV TO READ .ENV FILE -------------------------
require("dotenv").config();

// GET KEYS.JS & ANY ADDITIONAL REQUIRED FILES & PACKAGES -
const keys = require("./keys.js");
const request = require("request");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api")
const fs = require("fs");

// SPOTIFY & TWITTER API -------------------------------------------
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// GRABBING COMMAND LINE VALUES --------------------------
let command = process.argv[2];
let media = process.argv[3];

// TWITTER COMMANDS ---------------------------------------

if (command === 'my-tweets') {
  let params = {screen_name: 'britney76944406'};
  client.get('statuses/user_timeline', params, function(err, tweets, response) {
    if (!err) {
      for (i = 0; i < tweets.length; i++) {
        if (i < 20) {
          console.log(`Tweet: ${tweets[i].text}`);
          console.log(`Created: ${tweets[i].created_at}`);
          console.log(`---------------------------------`);
        }
      }
    } else {
      return err;
    }
  });
}

// SPOTIFY COMMANDS --------------------------------------
const spotifyFunc = function(param) {
  if (command === 'spotify-this-song') {
    spotify.search({ type: 'track', query: `${media}`, limit: 5 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      for (i = 0; i < data.tracks.items.length; i++) {
        console.log(`The name of the song is: ${data.tracks.items[i].name}`);
        console.log(`The artist's name is: ${data.tracks.items[i].album.artists[0].name}`);
        console.log(`The album name of this song is: ${data.tracks.items[i].album.name}`);
        console.log(`The URL to listen to this song: ${data.tracks.items[i].album.external_urls.spotify}`);
        console.log(`----------------------------------------------------------------------`);
      }
    });
  }
}

// DUPLICATE CODE....TRYING TO FIGURE OUT HOW TO MAKE FUNCTION AVAILABLE
// THROUGH BOTH THE COMMAND LINE AND THROUGH "DO-WHAT-THIS-SAYS"

if (command === 'spotify-this-song') {
  spotify.search({ type: 'track', query: `${media}`, limit: 5 }, function(err, data) {
    if (err) {
      return err;
    }

    for (i = 0; i < data.tracks.items.length; i++) {
      console.log(`The name of the song is: ${data.tracks.items[i].name}`);
      console.log(`The artist's name is: ${data.tracks.items[i].album.artists[0].name}`);
      console.log(`The album name of this song is: ${data.tracks.items[i].album.name}`);
      console.log(`The URL to listen to this song: ${data.tracks.items[i].album.external_urls.spotify}`);
      console.log(`----------------------------------------------------------------------`);
    }
  });
}

// MOVIE COMMANDS ----------------------------------------
if (command === 'movie-this') {
  request(`http://www.omdbapi.com/?t=${media}&y=&plot=short&apikey=trilogy`, function(err, response, content) {
    if (!err && response.statusCode === 200 && media) {
      console.log(`The title of the movie is: ${JSON.parse(content).Title}`);
      console.log(`The year this movie released: ${JSON.parse(content).Released}`);
      console.log(`The movie's IMDB rating is: ${JSON.parse(content).imdbRating}`);
      console.log(`The movie's Metascore is: ${JSON.parse(content).Metascore}`);
      console.log(`The movie's production took place in: ${JSON.parse(content).Country}`);
      console.log(`The movie's language is: ${JSON.parse(content).Language}`);
      console.log(`The movie's plot is: ${JSON.parse(content).Plot}`);
      console.log(`The actors who played in this movie are: ${JSON.parse(content).Actors}`);
    } else if (!err && response.statusCode === 200 && !media) {
      console.log('Please put in a movie! Or go watch Mr. Nobody! Its on Netflix!');
    } else {
      return err;
    }
  });
}

// RANDOM COMMANDS ------------------------------------------

if (command === 'do-what-it-says') {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return err;
    }

    let arr = data.split(",");
    command = arr[0];
    media = arr[1];

    if (command === 'spotify-this-song') {
     spotifyFunc(media);
    }
  });
}
