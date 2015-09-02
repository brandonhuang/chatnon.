swearjar = Meteor.npmRequire('swearjar');


Meteor.methods({
  messageInsert: function(messageAttributes) {
    // Message validations
    if(messageAttributes.text.length > 140) return;

    check(messageAttributes, {
      text: String,
      channel: String
    });

    if(Meteor.user()) {
      var message = _.extend(messageAttributes, {
        createdAt: new Date(),
        username: Meteor.user().username,
        color: Meteor.user().color
      });
    } else {
      var message = _.extend(messageAttributes, {
        createdAt: new Date(),
        username: 'chatnon'
      });
    }

    var messageId = messages.insert(message);
  },
  connectChannel: function(channel, userId) {
    // Channel name validations
    if(channel.length > 20) return;
    if(!/^[a-z0-9]*$/gi.test(channel)) return;

    // Create channel if it doesn't exist
    if(channels.find({name: channel}).count() === 0) {
      var profane = swearjar.profane(channel);
      channels.insert({name: channel, usersOnline: 0, profane: profane});
    }

    var channelName = 'channels.' + channel;
    var update = {'$set': {}, '$inc': {}};
    update['$set'][channelName + '.online'] = true;
    update['$inc'][channelName + '.connections'] = 1;

    Meteor.users.update(userId, update);

    var user = Meteor.users.findOne(userId);
    if(user.channels[channel].connections <= 1) {
      console.log(user.username, 'connected to', channel);

      // Increment usersOnline field for channel
      channels.update({name: channel}, {$inc: {usersOnline: 1}});
    }
  },
  disconnectChannel: function(channel, userId) {
    // Channel name validations
    if(channel.length > 20) return;
    if(!/^[a-z0-9]*$/gi.test(channel)) return;

    Meteor.setTimeout(function() {
      var user = Meteor.users.findOne(userId);
      var channelName = 'channels.' + channel;

      // Decrement channel connection and set channel.online: false if less than 1
      // Do cleanup if user is offline
      if(!user.status.online) {
        console.log(user.username, 'disconnected from', channel);
        var update = {'$set': {}};

        // Prevent $set is empty error
        update['$set'][channelName + '.online'] = false;

        for(var i in user.channels) {
          if(user.channels[i].online === true) {
            update['$set']['channels.' + i + '.online'] = false;
            update['$set']['channels.' + i + '.connections'] = 0;
          }
        }

        // Decrement usersOnline for channel
        channels.update({name: channel}, {$inc: {usersOnline: -1}});
      } else if(user.channels[channel].connections <= 1) {
        console.log(user.username, 'disconnected from', channel);

        var update = {'$set': {}};
        update['$set'][channelName + '.online'] = false;
        update['$set'][channelName + '.connections'] = 0;

        // Decrement usersOnline for channel
        channels.update({name: channel}, {$inc: {usersOnline: -1}});
      } else {
        var update = {'$inc': {}};
        update['$inc'][channelName + '.connections'] = -1;
      }

      Meteor.users.update(userId, update);
    }, 500);
  },
  newUserColor: function() {
    var color = generateColor();
    Meteor.users.update(Meteor.userId(), {$set: {color: color}});
  },
  generateColor: function() {
    return generateColor();
  },
  updateLocation: function(location) {
    Meteor.users.update(Meteor.userId(), {$set: {location: location}});
  },
  expUp: function(user, channel, exp) {
    var property = 'channels.' + channel + '.exp';
    var update = {'$inc': {}};
    update['$inc'][property] = exp;

    Meteor.users.update(user._id, update);
  }
});