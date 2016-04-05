/************
 * DATABASE *
 ************/

/* hard-coded data */
// var albums = [];
// albums.push({
//               _id: 132,
//               artistName: 'Nine Inch Nails',
//               name: 'The Downward Spiral',
//               releaseDate: '1994, March 8',
//               genres: [ 'industrial', 'industrial metal' ]
//             });
// albums.push({
//               _id: 133,
//               artistName: 'Metallica',
//               name: 'Metallica',
//               releaseDate: '1991, August 12',
//               genres: [ 'heavy metal' ]
//             });
// albums.push({
//               _id: 134,
//               artistName: 'The Prodigy',
//               name: 'Music for the Jilted Generation',
//               releaseDate: '1994, July 4',
//               genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
//             });
// albums.push({
//               _id: 135,
//               artistName: 'Johnny Cash',
//               name: 'Unchained',
//               releaseDate: '1996, November 5',
//               genres: [ 'country', 'rock' ]
//             });

var db = require('../models');

// var express = require('express'),
//     app = express();
//
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

// GET /api/albums
function index(req, res) {
    db.Album.find(function(err, albums) {
      if (err) {
        console.log("Error getting index");
      } res.json(albums);
    });
}

function create(req, res) {
  console.log("new");
  console.log(req.body);

  // var input = req.body
  var genresString = req.body.genres;
  var name = req.body.name;
  var artistName = req.body.artistName;
  var releaseDate = req.body.releaseDate;

  // if ( (name.length>0) && (genresString.length>0) && (artistName.length>0) && (releaseDate.length>0) ){

      var newAlbum = new db.Album ({
        name: name,
        artistName: artistName,
        releaseDate: releaseDate,
        genres: genresString.split(',')
      });
      console.log("new album", newAlbum);

      newAlbum.save(function (err, album) {
        if (err) {
          console.log("saving album error", err);
        }
        console.log("saved album", album);
        res.json(album);
      });
  // } res.json ("Please fill in all fields");
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
