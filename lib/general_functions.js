generateColor = function() {
  var hue = Math.floor(Math.random() * 360);
  var sat = Math.floor(Math.random() * 20 + 40);
  var lum = Math.floor(Math.random() * 20 + 40);
  var color = 'hsl('+ hue +', '+ sat +'%, '+ lum +'%)';
  return color;
}

// returns object to be used in mongodb find
inChannel = function() {
  var channelName = "channels." + Session.get('channel') + ".online";
  var obj = {}
      obj[channelName] = true;

  return obj;
}

sessionId = function() {
  return Meteor.connection._lastSessionId;
}
