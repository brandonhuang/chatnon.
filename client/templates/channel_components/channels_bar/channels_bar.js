Template.channelsBar.helpers({
  channels: function() {
    return channels.find({profane: false, usersOnline: {$gt: 0}}, {sort: {usersOnline: -1, name: 1}, limit: 30});
  }
});