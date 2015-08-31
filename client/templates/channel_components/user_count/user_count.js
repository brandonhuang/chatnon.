Template.userCount.helpers({
  users: function() {
    if(Session.get('channel')) {
      return channels.findOne({name: Session.get('channel')}).usersOnline;
    }
  }
});
