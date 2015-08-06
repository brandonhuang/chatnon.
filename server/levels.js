var interval = 60000;

Meteor.setInterval(function() {
  var users = Meteor.users.find({ "status.online": true }).fetch();

  users.forEach(function(user) {
    var exp = user.exp + 1
    Meteor.users.update({username: user.username}, {$set: {exp: exp}});

    lastMessage = messages.findOne({username: user.username}, {sort: {createdAt: -1}});

    if(lastMessage.createdAt > new Date() - interval) {
      var exp = user.exp + 10;
      Meteor.users.update({username: user.username}, {$set: {exp: exp}});
    }

    if(user.exp >= user.level * 500 ) {
      Meteor.users.update({username: user.username}, {$set: {exp: 0}});
      var level = user.level + 1;
      Meteor.users.update({username: user.username}, {$set: {level: level}});
    }

    console.log(user.level, user.exp);
  });
}, interval);