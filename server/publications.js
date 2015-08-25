Meteor.publish('users', function() {
  return Meteor.users.find({}, {
    fields: {
      '_id': 1,
      'username': 1,
      'color': 1,
      'level': 1,
      'exp': 1,
      'status': 1,
      'location': 1,
      'channels': 1
    }
  });
});

Meteor.publish('messages', function(channel) {
  return messages.find({channel: channel}, {sort: {createdAt: -1}, limit: 100});
});

Meteor.publish('channelStatus', function(channel) {
  if(this.userId) {
    var userId = this.userId;

    Meteor.call('connectChannel', channel, userId);

    this.onStop(function() {
      Meteor.call('disconnectChannel', channel, userId);
    });
  }
  return [];
});

Meteor.publish('channels', function() {
  return channels.find({});
});