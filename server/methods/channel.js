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

    var channelName = 'channels.' + channel + '.online';
    var update = { "$set" : { } };
    update["$set"][channelName] = true;

    Meteor.users.update(Meteor.userId(), update);
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
  levelUp: function(user) {
    Meteor.users.update(Meteor.userId(), {$set: {level: user.level + 1}});
  },
  expUp: function(user, exp) {
    Meteor.users.update(Meteor.userId(), {$set: {exp: user.exp + exp}})
  },
  expReset: function(user) {
    Meteor.users.update(Meteor.userId(), {$set: {exp: 0}})
  }
});