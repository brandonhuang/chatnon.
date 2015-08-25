Template.userCount.helpers({
  users: function() {
    return channels.findOne({name: Session.get('channel')}).usersOnline;
  }
});
