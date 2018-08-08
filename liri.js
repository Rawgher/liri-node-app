require("dotenv").config();
let fs = require("fs");
let request = require("request");

const keys = require("./keys");
let Spotify = require("node-spotify-api");

const command = process.argv[2];
let movieName = process.argv[3];
let songName = process.argv[3];

let omdbKey = keys.omdb.id;

let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// const client = new Twitter(keys.twitter);



// function twitter() {
// request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + client + "&count=20", function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var screenName= JSON.parse((response.body).screen_name);
//         var time= JSON.parse((response.body).);
//         var message= JSON.parse((response.body).screen_name);
//     };
// }
// }


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

            console.log("Artist: " + artist);
            console.log("Song Name: " + song);
            console.log("Preview Link: " + link);
            console.log("Album Name: " + album);


            fs.appendFile('log.txt', "\nSong Search\n")
            fs.appendFile('log.txt', "Artist: " + artist + "\n");
            fs.appendFile('log.txt', "Song Name: " + song + "\n");
            fs.appendFile('log.txt', "Preview Link: " + link + "\n");
            fs.appendFile('log.txt', "Album Name: " + album + "\n");
        });

    } else {
        spotify.search({ type: 'track', query: songName, limit: "1" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var starter = data.tracks.items[0]

            let artist = starter.artists[0].name;
            let song = starter.name;
            let link = starter.preview_url;
            let album = starter.album.name;

            console.log("Artist: " + artist);
            console.log("Song Name: " + song);
            console.log("Preview Link: " + link);
            console.log("Album Name: " + album);

            fs.appendFile('log.txt', "\nSong Search\n")
            fs.appendFile('log.txt', "Artist: " + artist + "\n");
            fs.appendFile('log.txt', "Song Name: " + song + "\n");
            fs.appendFile('log.txt', "Preview Link: " + link + "\n");
            fs.appendFile('log.txt', "Album Name: " + album + "\n");
        });

    }

};

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

                console.log("Title: " + title);
                console.log("Release Year: " + year);
                console.log("IMDB Rating: " + rating);
                console.log("Rotten Tomatoes Rating: " + rotten);
                console.log("Origin Country: " + country);
                console.log("Language: " + lang);
                console.log("Plot: " + plot);
                console.log("Cast: " + cast);

                fs.appendFile('log.txt', "\nMovie Search\n")
                fs.appendFile('log.txt', "Title: " + title + "\n");
                fs.appendFile('log.txt', "Release Year: " + year + "\n");
                fs.appendFile('log.txt', "IMDB Rating: " + rating + "\n");
                fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + rotten + "\n");
                fs.appendFile('log.txt', "Origin Country: " + country + "\n");
                fs.appendFile('log.txt', "Language: " + lang + "\n");
                fs.appendFile('log.txt', "Plot: " + plot + "\n");
                fs.appendFile('log.txt', "Cast: " + cast + "\n");
            }
        });
    } else {
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

            console.log("Title: " + title);
            console.log("Release Year: " + year);
            console.log("IMDB Rating: " + rating);
            console.log("Rotten Tomatoes Rating: " + rotten);
            console.log("Origin Country: " + country);
            console.log("Language: " + lang);
            console.log("Plot: " + plot);
            console.log("Cast: " + cast);

            fs.appendFile('log.txt', "\nMovie Search\n")
            fs.appendFile('log.txt', "Title: " + title + "\n");
            fs.appendFile('log.txt', "Release Year: " + year + "\n");
            fs.appendFile('log.txt', "IMDB Rating: " + rating + "\n");
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + rotten + "\n");
            fs.appendFile('log.txt', "Origin Country: " + country + "\n");
            fs.appendFile('log.txt', "Language: " + lang + "\n");
            fs.appendFile('log.txt', "Plot: " + plot + "\n");
            fs.appendFile('log.txt', "Cast: " + cast + "\n");
        });

    }
}

// function doIt() {

// }



if (command === "my-tweets") {
    // twitter();
} else if (command === "spotify-this-song") {
    spotifySearch(songName);
} else if (command === "movie-this") {
    omdb(movieName);
} else if ("do-what-it-says") {
    // doIt();
}
