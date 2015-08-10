var shortInterval = 60000;

Meteor.setInterval(function() {
  var users = Meteor.users.find({ 'status.online': true }).fetch();

  users.forEach(function(user) {
    var lastMessage = messages.findOne({username: user.username}, {sort: {createdAt: -1}});
    var exp = 0;

    if(lastMessage === undefined) return;

    if(lastMessage.createdAt > new Date() - shortInterval) { // If user is super active
      exp += 21;
    }
    else if(lastMessage.createdAt > new Date() - 600000) { // If user is active
      exp += 20;
    }
    else if(lastMessage.createdAt > new Date() - 1800000) { // If user is somewhat active
      exp += 10;
    }
    else { // If user is online, but idle
      exp++;
    }

    Meteor.call('expUp', user, exp);

    // Level up if user meets exp requirements
    if(user.exp >= Math.pow((user.level * 100), 1.2)) {
      Meteor.call('expReset', user);
      Meteor.call('levelUp', user);
    }
  });
}, shortInterval);