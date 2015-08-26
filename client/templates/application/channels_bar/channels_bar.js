Template.channelsBar.helpers({
  channels: function() {
    return channels.find({}, {sort: {usersOnline: -1, name: 1}, limit: 30});
  }
});