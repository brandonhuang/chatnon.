Meteor.methods({
  messageInsert: function(messageAttributes) {
    // check(Meteor.userId(), String);

    check(messageAttributes, {
      text: String,
      channel: String
    });

    var message = _.extend(messageAttributes, {
      createdAt: new Date(),
      username: Meteor.user().username,
      color: Meteor.user().color
    });

    var messageId = messages.insert(message);
  },
  newColor: function() {
    var color = generateColor();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {color: color}});
  },
  updateLocation: function(location) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {location: location}});
  },
  levelUp: function(user) {
    Meteor.users.update({username: user.username}, {$set: {level: user.level + 1}});
  },
  expUp: function(user, exp) {
    Meteor.users.update({username: user.username}, {$set: {exp: user.exp + exp}})
  },
  expReset: function(user) {
    Meteor.users.update({username: user.username}, {$set: {exp: 0}})
  }
});