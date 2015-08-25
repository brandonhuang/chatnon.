Template.channelsBar.helpers({
  channels: function() {
    return channels.find({}, {sort: {usersOnline: -1}});
  }
});