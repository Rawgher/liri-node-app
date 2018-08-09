require("dotenv").config();
let fs = require("fs");
let request = require("request");

const keys = require("./keys");
let Spotify = require("node-spotify-api");

const command = process.argv[2];
let movieName = process.argv[3];
let songName = process.argv[3];

const omdbKey = keys.omdb.id;

const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

let Twitter = require('twitter');

const client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});


// my screen name
let params = {
    screen_name: 'Rawgher'
};

function twitter() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error && response.statusCode === 200) {
            // console.log(tweets);

            console.log("Screen Name: " + params.screen_name + "\nTweet Content: " + tweets[0].text+ "\nCreated On: " + tweets[0].created_at)
        }
    })
};

// need to double check preview url link

function spotifySearch(songName) {

    if (songName) {

        spotify.search({ type: 'track', query: songName, limit: "1" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var starter = data.tracks.items[0]

            let artist = starter.artists[0].name;
            let song = starter.name;
            let link = starter.preview_url;
            let album = starter.album.name;

            console.log("Artist: " + artist + "\nSong Name: " + song + "\nPreview Link: " + link+ "\nAlbum Name: " + album);


            fs.appendFile('log.txt', "\nSong Search\nArtist: " + artist + "\nSong Name: " + song + "\nPreview Link: " + link + "\nAlbum Name: " + album + "\n", function(err) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
            });
        });

    } else {
        spotify.search({ type: 'track', query: "Natural", limit: "1" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var starter = data.tracks.items[0]

            let artist = starter.artists[0].name;
            let song = starter.name;
            let link = starter.preview_url;
            let album = starter.album.name;

            console.log("Artist: " + artist + "\nSong Name: " + song + "\nPreview Link: " + link+ "\nAlbum Name: " + album);

            fs.appendFile('log.txt', "\nSong Search\nArtist: " + artist + "\nSong Name: " + song + "\nPreview Link: " + link + "\nAlbum Name: " + album + "\n", function(err) {
                
                if (err) {
                    return console.log('Error occurred: ' + err);
                } // end of if error statement

            }); // end of fs append
        
        }); // end of spotify search

    } // end of else statement

};

// need to look into rotten tomato section

function omdb(movieName) {

    if (movieName) {
        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                let title = JSON.parse(body).Title;
                let year = JSON.parse(body).Year;
                let rating = JSON.parse(body).imdbRating;
                // need to add if statement to see if rotten tomatoes works or not
                let rotten = JSON.parse(body).Ratings[1].Value;
                let country = JSON.parse(body).Country;
                let lang = JSON.parse(body).Language;
                let plot = JSON.parse(body).Plot;
                let cast = JSON.parse(body).Actors;

                console.log("Title: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nRotten Tomatoes Rating: " + rotten + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot+ "\nCast: " + cast);

                fs.appendFile('log.txt', "\nMovie Search\nTitle: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nRotten Tomatoes Rating: " + rotten + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast + "\n", function(err) {
                
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    } // end of fs error statement
                
                }); // end of fs append

            } // end of inner if statement

        }); // end of if request

    } // end of if statement 

    else {
        request("http://www.omdbapi.com/?t=The+Hobbit+An+Unexpected+Journey&y=&plot=short&apikey=trilogy", function (error, response, body) {
            console.log("You should watch the Hobbit!");

            let title = JSON.parse(body).Title;
            let year = JSON.parse(body).Year;
            let rating = JSON.parse(body).imdbRating;
            // need to add if statement to see if rotten tomatoes works or not
            let rotten = JSON.parse(body).Ratings[1].Value;
            let country = JSON.parse(body).Country;
            let lang = JSON.parse(body).Language;
            let plot = JSON.parse(body).Plot;
            let cast = JSON.parse(body).Actors;

            console.log("Title: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nRotten Tomatoes Rating: " + rotten + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot+ "\nCast: " + cast);

            fs.appendFile('log.txt', "\nMovie Search\nTitle: " + title + "\nRelease Year: " + year + "\nIMDB Rating: " + rating + "\nRotten Tomatoes Rating: " + rotten + "\nOrigin Country: " + country + "\nLanguage: " + lang + "\nPlot: " + plot + "\nCast: " + cast + "\n", function(err) {
                
                if (err) {
                    return console.log('Error occurred: ' + err);
                
                } // end of error if statement
            
            }); // end of fs append

        }); // end of else request

    } // end of else statement

} //end of movie function

// function doIt() {

// }



if (command === "my-tweets") {
    twitter();
} else if (command === "spotify-this-song") {
    spotifySearch(songName);
} else if (command === "movie-this") {
    omdb(movieName);
} else if ("do-what-it-says") {
    // doIt();
}
