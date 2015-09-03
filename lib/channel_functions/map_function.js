fetchLocation = function() {
  navigator.geolocation.getCurrentPosition(geoSuccess);
}

geoSuccess = function(location) {
  var location = {
    latitude: Math.round(location.coords.latitude * 25)/25,
    longitude: Math.round(location.coords.longitude * 25)/25,
  };
  Meteor.call('updateLocation', location, function(err) {
    if(err) throw err;
  });
};

addMarker = function(user) {
  if($.isEmptyObject(user.location)) return;

  var latlng = new google.maps.LatLng(user.location.latitude, user.location.longitude);
  var marker = new UserMarker({
    id: user.username,
    latlng: latlng,
    color: user.color,
    map: map
  });
  markers.push(marker);
}
removeMarker = function(user) {
  if($.isEmptyObject(user.location)) return;

  for(var i = 0; i < markers.length; i++) {
    if(markers[i].id == user.username) {
      markers[i].setMap(null);
      markers.splice(i, 1);
      break;
    }
  }
}