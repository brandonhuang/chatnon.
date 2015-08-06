markers = [];

Meteor.startup(function() {
  fetchLocation();
});

Template.googleMaps.onRendered(function() {
  // Initialize Google Maps
  var mapOptions = {
    center: { lat: 0, lng: 0},
    zoom: 2,
    disableDefaultUI: true,
    zoomControl: true
  };

  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

  Meteor.users.find({ "status.online": true }).observe({
    added: addMarker,
    changed: function(user) {
      removeMarker(user);
      addMarker(user);
    },
    removed: removeMarker
  })
});

function fetchLocation() {
  navigator.geolocation.getCurrentPosition(geoSuccess);
}

function geoSuccess(location) {
  var location = {
    latitude: Math.round(location.coords.latitude * 25)/25,
    longitude: Math.round(location.coords.longitude * 25)/25,
  };
  Meteor.call('updateLocation', location, function(err) {
    if(err) throw err;
  });
};

function addMarker(user) {
  var latlng = new google.maps.LatLng(user.location.latitude, user.location.longitude);
  var marker = new UserMarker({
    id: user.username,
    latlng: latlng,
    color: user.color,
    map: map
  });
  markers.push(marker);
}
function removeMarker(user) {
  for(var i = 0; i < markers.length; i++) {
    if(markers[i].id == user.username) {
      markers[i].setMap(null);
      markers.splice(i, 1);
      break;
    }
  }
}