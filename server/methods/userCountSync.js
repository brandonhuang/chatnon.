Meteor.startup(function() {
  Meteor.setTimeout(function() {
    var openChannels = channels.find({});

    openChannels.forEach(function(channel) {
      var obj = {};
          obj['channels.' + channel.name + '.online'] = true;
      var usersOnline = Meteor.users.find(obj).count();

      channels.update(channel._id, {$set: {usersOnline: usersOnline}});
    });

    console.log('channel userCounts synced');
  }, 1000);

  Meteor.setInterval(function() {
    var openChannels = channels.find({});

    openChannels.forEach(function(channel) {
      var obj = {};
          obj['channels.' + channel.name + '.online'] = true;
      var usersOnline = Meteor.users.find(obj).count();

      channels.update(channel._id, {$set: {usersOnline: usersOnline}});
    });

    console.log('channel userCounts synced');
  }, 3600000);
});