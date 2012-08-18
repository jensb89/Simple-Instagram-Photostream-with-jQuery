$(document).ready(function(){
var requesturl="https://api.instagram.com/v1/users/self/feed?access_token=TOKEN";
settings = {count: null}; //anzahl festlegen
var el=$('.instagram');

function createPhotoElement(photo) {
      return $('<li>').addClass('instagram-placeholder').addClass('span2').attr('id', photo.id).append($('<a>').attr('href', photo.link).addClass('thumbnail').attr('target', '_blank').append($('<img>').addClass('instagram-image').attr('src', photo.images.thumbnail.url)));
}
    
$.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: requesturl,
      success: function(res) {
        var length = typeof res.data != 'undefined' ? res.data.length : 0;
        var limit = settings.count != null && settings.count < length ? settings.count : length;
        if(limit > 0) {
		  el.append($('<ul />').addClass('thumbnails'));
          for(var i = 0; i < limit; i++) {
            $('.instagram ul').append(createPhotoElement(res.data[i]));
          }
        }
        else {
          return $('<div>').addClass('error').append($('<p>').html('Keine Fotos gefunden!'));
        }
      }
    });
});