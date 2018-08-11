// requiring .env file
require("dotenv").config();

// requiring file system
const fs = require("fs");

// requiring request npm
const request = require("request");

// requiring keys javascript account
const keys = require("./keys");

// requiring spotify node npm
let Spotify = require("node-spotify-api");

// variables set to pull user input from command line
const command = process.argv[2];
let movieName = process.argv[3];
let songName = process.argv[3];

// omdb secret key
const omdbKey = keys.omdb.id;

//spotify secret keys
const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// requiring twitter node npm
let Twitter = require('twitter');

// twitter secret keys
const client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});


// parameters passed through the twitter get function
let params = {
    screen_name: 'SquareEnix',
    count: 20
};

// function setting up twitter grab
function twitter() {
    // setting up the api call
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error && response.statusCode === 200) {
            
            // for loop used to grab the most recent 20 tweets
            for (var i = 0; i < tweets.length; i++) {
                console.log("Screen Name: " + params.screen_name + "\nTweet Content: " + tweets[i].text + "\nCreated On: " + tweets[i].created_at + "\n")

                // append file function to log all the tweets to log.txt file
                fs.appendFile('log.txt', "\nTweets\nScreen Name: " + params.screen_name + "\nTweet Content: " + tweets[i].text + "\nCreated On: " + tweets[i].created_at + "\n", function (err) {

                    if (err) {
                        return console.log('Error occurred: ' + err);
                    } 

                }); 

            }

        }

    })

};

// spotify search function
function spotifySearch(songName) {

    // if the user inputs a valid song name
    if (songName) {
        
        //setting up spotify api call and limiting to one result
        spotify.search({ type: 'track', query: songName, limit: "1" }, function (err, data) {
            
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            
            var starter = data.tracks.items[0]

            let artist = starter.artists[0].name;
            let song = starter.name;
            let link = starter.preview_url;
            let album = starter.album.name;

            // function made to show text if preview link url isn't available
            function newLink() {
                if (link === null) {
                    console.log("Preview Link: Looks like this song doesn't have a preview link.");
                } else {
                    console.log("Preview Link: " + link);
                };
            }
            
            // logging results to the console
            console.log("Artist: " + artist + "\nSong Name: " + song + "\nAlbum Name: " + album);
            newLink();

            // append file function to add results to log.txt file
            fs.appendFile('log.txt', "\nSong Search\nArtist: " + artist + "\nSong Name: " + song + "\nAlbum Name: " + album + "\nPreview Link: " + link + "\n", function (err) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } 

            });

        });

    // else statement for if the user doesn't input a song name
    } else {

        // spotify search function that manually inputs Chop Suey for the search result
        spotify.search({ type: 'track', query: "Chop Suey!", limit: "1" }, function (err, data) {
            
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            
            const starter = data.tracks.items[0]

            let artist = starter.artists[0].name;
            let song = starter.name;
            let link = starter.preview_url
            let album = starter.album.name;

            //conole logs for the results
            console.log("WAKE UP! You didn't enter a valid song... So go listen to Chop Suey!")
            console.log("Artist: " + artist + "\nSong Name: " + song + "\nPreview Link: " + link + "\nAlbum Name: " + album);

            // append file function to add default search result to log.txt file
            fs.appendFile('log.txt', "\nNo User Input Song Search\nArtist: " + artist + "\nSong Name: " + song + "\nPreview Link: " + link + "\nAlbum Name: " + album + "\n", function (err) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }

            });

        });

    }

};

// function for omdb calls
function omdb(movieName) {

    // called if the user enters a movie
    if (movieName) {
        
        // setting up request for user input movie
        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                let title = JSON.parse(body).Title;
                let year = JSON.parse(body).Year;
                let rating = JSON.parse(body).imdbRating;
                let rotten = newRotten();
                let country = JSON.parse(body).Country;
                let lang = JSON.parse(body).Language;
                let plot = JSON.parse(body).Plot;
                let cast = JSON.parse(body).Actors;

                // function in case the movie does not have a rotten tomato it will display new text
                function newRotten() {
                    if (JSON.parse(body).Ratings && JSON.parse(body).Ratings[1]) {
                        return ("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    } else {
                        return("Rotten Tomatoes Rating: Looks like this movie doesn't have a valid rotten tomatoes rating.");
                    };
                }

                // logging results to terminal
                console.log("Title: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast + "\n" + rotten);

                // appending information to log.txt file
                fs.appendFile('log.txt', "\nMovie Search\nTitle: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating +   "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast + "\n" + rotten + "\n", function (err) {

                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                });

            }

        });

    // function that runs if the user does not input a movie
    } else {
        // request that defaults to newest Hobbit movie
        request("http://www.omdbapi.com/?t=The+Hobbit+An+Unexpected+Journey&y=&plot=short&apikey=" + omdbKey, function (error, response, body) {
            console.log("You didn't enter a movie name... So I'll suggest watching The Hobbit!");

            let title = JSON.parse(body).Title;
            let year = JSON.parse(body).Year;
            let rating = JSON.parse(body).imdbRating;
            let rotten = JSON.parse(body).Ratings[1].Value;
            let country = JSON.parse(body).Country;
            let lang = JSON.parse(body).Language;
            let plot = JSON.parse(body).Plot;
            let cast = JSON.parse(body).Actors;

            // logs results to the console
            console.log("Title: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nRotten Tomatoes Rating: " + rotten + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast);

            // appends information to log.txt file
            fs.appendFile('log.txt', "\nNo User Input Movie Search\nTitle: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nRotten Tomatoes Rating: " + rotten + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast + "\n", function (err) {

                if (err) {
                    return console.log('Error occurred: ' + err);

                }

            });

        });

    } 

} 

// function that pulls fromt random.txt file to do a search
function doIt() {

    fs.readFile('random.txt', "utf8", function (error, data) {
        var songTitle = data.split(',');

        spotifySearch(songTitle[1]);

    });
}

//if else statements that take the third input (second argument) on the terminal line and decides which function runs
if (command === "my-tweets") {
    twitter();
} else if (command === "spotify-this-song") {
    spotifySearch(songName);
} else if (command === "movie-this") {
    omdb(movieName);
} else if ("do-what-it-says") {
    doIt();
}
