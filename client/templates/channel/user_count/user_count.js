Template.userCount.helpers({
  users: function() {
    return Meteor.users.find({ "status.online": true }).count();
  }
});