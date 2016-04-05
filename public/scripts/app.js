/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

console.log("Sanity Check!")
var template;
var allAlbums = [];
var $albumsList = $('#albums')

/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */



$(document).ready(function() {
  console.log('app.js loaded!');

  $('#albums').on('click', '.add-song', function(e) {
    $('#songsong input').val('');
    console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('album id',id);
    //removing clicked on album//
    $(this).parents('.album').remove();

    $('#songModal').attr('data-album-id', id);
    $('#songModal').modal('show');

      $('#saveSong').on('click', function(e) {
        e.preventDefault();
        $('#songModal').modal('hide');
        var modalData = $('#songsong').serializeArray();
        console.log(modalData); //new song array

          $.ajax ({
            method: 'POST',
            url: '/api/albums/' + id + '/songs',
            data: modalData,
            success: songAddSuccess,
            error: songAddError
          });
      });

    });



  $('#add').on('click', function (){
    $('#genresForm').append('<div class="col-md-4 col-md-offset-4"><input type="text" class="form-control" id="genres" name="input[]" required="true"><button type="button" id="add" class="btn btn-default"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button></div>');
  });


  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: onSuccess,
    error: onError
  });

$("form").on('submit', function (e) {
  e.preventDefault();

  // console.log( $(this).serializeArray() );
  // console.log( $("input[name = 'artistName']").val() )

  // var nameInput = $("input[name = 'name']").val();
  // var artistNameInput = $("input[name = 'artistName']").val();
  // var releaseDateInput = $("input[name = 'releaseDate']").val();
  // var genresInput = $("input[name = 'genres']");
  // var form = ( $(this).serializeArray() )
  //
  // console.log("the form is ", form);
  //
  // // for (var i = 0; i < form.length; i++) {
  // //   if form[i].value === null {
  // //     alert ("Please fill in all fields")
  // //   }
  // // }
  // while ( (nameInput.length < 0) && (artistNameInput.length < 0) && (releaseDateInput.length < 0) && (genresInput.length < 0) ){
  //   alert ("Please fill in all fields")}
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: formSuccess,
      error: formError
    });
    $('form input').val('');
});

  function renderAlbum(album) {
    // console.log(album);

    // $albumsList.empty();
    var source = $('#albums-template').html();
    template = Handlebars.compile(source);
    var albumsHtml = template(album);
    // console.log(albumsHtml);
    $('#albums').prepend(albumsHtml);

  }

  function onError(){
    console.log("albums failed");
  }

  function onSuccess(albums){
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  }


  function formSuccess(json){
    $('#form input').val("");
    console.log("this is new album", json);
    allAlbums.push(json);
    renderAlbum(json);
  }


  function formError(){
    console.log("albums failed");
  }


  // function songAddSuccess(json) {
  //   console.log("song added to new album", json);
  //   var newSong = json;
  //   var newSongId = newSong._id;
  //
  //   for (var i=0; i<allAlbums.length;i++){
  //     if(allAlbums[i]._id === newSongId) {
  //       allAlbums[i].songs.append(newSong);
  //       break;
  //     }
  //   }
  //   renderAlbum(json);
  // }

  function songAddSuccess(json) {
    console.log("new album with saved song", json);
    var newAlbum = json;
    var newAlbumId = newAlbum._id;

    for (var i=0; i<allAlbums.length;i++){
      if(allAlbums[i]._id === newAlbumId) {
        allAlbums[i] = newAlbum;
        break;
      }
    }
    renderAlbum(newAlbum);
  }

  function songAddError (json) {
    console.log("song added eror")
  }

});  //closes document ready
