Meteor.methods({
  messageInsert: function(messageAttributes) {
    // check(Meteor.userId(), String);

    check(messageAttributes, {
      text: String,
      channel: String
    });

    var message = _.extend(messageAttributes, {
      createdAt: new Date(),
      username: Meteor.user().username,
      color: Meteor.user().color
    });

    var messageId = messages.insert(message);
  },
  connectChannel: function(channel) {
    console.log(Meteor.userId(), 'connected to', channel);

    var propName = 'channels.' + channel + '.online';
    var update = { "$set" : { } };
    update["$set"][propName] = true;

    Meteor.users.update(Meteor.userId(), update);

    var channelExp = Meteor.user().channels[channel].exp;
    if(channelExp === undefined) {
      var propName = 'channels.' + channel + '.exp';
      var update = { "$set" : {} };
      update['$set'][propName] = 0;

      Meteor.users.update(Meteor.userId(), update);
    }
  },
  disconnectChannel: function(channel, userId) {
    if(userId === undefined) {
      userId = Meteor.userId();
    }

    console.log(userId, 'disconnected from', channel);

    var channelName = 'channels.' + channel + '.online';
    var update = { "$set" : { } };
    update["$set"][channelName] = false;

    Meteor.users.update(userId, update);
  },
  newColor: function() {
    var color = generateColor();
    Meteor.users.update(Meteor.userId(), {$set: {color: color}});
  },
  updateLocation: function(location) {
    Meteor.users.update(Meteor.userId(), {$set: {location: location}});
  },
  expUp: function(user, channel, exp) {
    var property = 'channels.' + channel + '.exp';
    var update = { "$inc" : {} };
    update["$inc"][property] = exp;

    Meteor.users.update(user._id, update);
    console.log(user.username, user.channels);
  }
});