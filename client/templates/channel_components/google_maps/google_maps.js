markers = [];

Template.googleMaps.onRendered(function() {
  // Initialize Google Maps
  var mapOptions = {
    center: { lat: 0, lng: 0},
    zoom: 2,
    disableDefaultUI: true,
    zoomControl: true
  };

  map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

  Meteor.users.find(inChannel()).observe({
    added: addMarker,
    removed: removeMarker
  })
});

Tracker.autorun(function() {
  if(Meteor.userId()) {
    fetchLocation();
  }
});