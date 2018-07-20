require("dotenv").config();

let keys = require("./keys.js");
let request = require("request");
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let command = process.argv[2];
let media = process.argv[3];

if (command === 'my-tweets') {

}

if (command === 'spotify-this-song') {
  
}

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

if (command === 'do-what-it-says') {

}
