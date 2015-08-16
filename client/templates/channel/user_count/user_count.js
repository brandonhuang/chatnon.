Template.userCount.helpers({
  users: function() {
    return Meteor.users.find(inChannel()).count();
  }
});
