require("dotenv").config();
let request = require("request");

// const keys = require("./keys.js");
// let Spotify = require("node-spotify-api")
// const spotify = new Spotify(keys.spotify);
// const client = new Twitter(keys.twitter);
// const omdbKey = omdbKeys;

const command = process.argv[2];
let movieName = process.argv[3];
let songName = process.argv[3];

// function twitter() {
// request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + client + "&count=20", function (error, response, body) {

//     if (!error && response.statusCode === 200) {
//         var screenName= JSON.parse((response.body).screen_name);
//         var time= JSON.parse((response.body).);
//         var message= JSON.parse((response.body).screen_name);
//     };
// }
// }

// function spotify(songName) {

// }

function omdb(movieName) {

    if (process.argv > 3) {
        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                var title = JSON.parse(body).Title;
                var year = JSON.parse(body).Year;
                var rating = JSON.parse(body).imdbRating;
                var rotten = JSON.parse(body).Ratings[1].value;
                var country = JSON.parse(body).Country;
                var lang = JSON.parse(body).Language;
                var plot = JSON.parse(body).Plot;
                var cast = JSON.parse(body).Actors;

                console.log("Title: " + title);
                console.log("Year: " + year);
                console.log("IMDB Rating: " + rating);
                console.log("Rotten Tomatoes Rating: " + rotten);
                console.log("Origin Country: " + country);
                console.log("Language: " + lang);
                console.log("Plot: " + plot);
                console.log("Cast: " + cast);
            }
        });
        } else {
        request("http://www.omdbapi.com/?t=The+Hobbit&y=&plot=short&apikey=trilogy", function (error, response, body) {
            console.log("You should watch the Hobbit!");
        });

    }
}

// function doIt() {

// }



if (command === "my-tweets") {
    // twitter();
} else if (command === "spotify-this-song") {
    spotify(songName);
} else if (command === "movie-this") {
    omdb(movieName);
} else if ("do-what-it-says") {
    // doIt();
}
