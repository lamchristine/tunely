var db = require('../models');


// function create(req, res) {
//     // console.log("req",req.body);
//
//     var albumId = req.params.albumId;
//     console.log('albumid', albumId);
//
//     db.Album.findById(albumId)
//       .exec(function (err, foundAlbum) {
//         var newSong = new db.Song(req.body);
//         foundAlbum.songs.push(newSong);
//           foundAlbum.save(function (err, savedAlbum) {
//             console.log('newSong created:', newSong);
//
//             res.json(newSong);
//         });
//       });
//     }



    function create(req, res) {
        // console.log("req",req.body);

        var albumId = req.params.albumId;
        console.log('albumid', albumId);

        db.Album.findById(albumId)
          .exec(function (err, foundAlbum) {
            var newSong = new db.Song(req.body);
            foundAlbum.songs.push(newSong);
              foundAlbum.save(function (err, savedAlbum) {
                console.log('newSong created:', foundAlbum);

                res.json(foundAlbum);
            });
          });
        }

//     var newSong = new db.Song({
//       name: req.body.songName,
//       trackNumber: req.body.trackNumber,
//     }); console.log("newsong",newSong);
//
//       newSong.save(function (err, song) {
//       if(err) {
//         console.log("new song error", err);
//       }
//       console.log("song saved", song);
//       res.json(song);
//     });
// }


module.exports = {
  // index: index,
  create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
