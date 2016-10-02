Meteor.setInterval(function() {
  var users = Meteor.users.find({ 'status.online': true }).fetch();

  users.forEach(function(user) {
    // for(var prop in user.channels) {
    //   if(user.channels[prop].online = true) {
    //     var lastMessage = messages.findOne({username: user.username, }, {sort: {createdAt: -1}});
    //   }
    // }

    var lastMessage = messages.findOne({username: user.username}, {sort: {createdAt: -1}});
    var exp = 0;

    if(lastMessage === undefined) return;

    if(lastMessage.createdAt > new Date() - 600000) { // If user is active
      exp += 1;
    }

    if(exp > 0) {
      Meteor.call('expUp', user, exp);
    }
  });
}, 60000);
