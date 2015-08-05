Meteor.methods({
  messageInsert: function(messageAttributes) {
    // check(Meteor.userId(), String);

    check(messageAttributes, {
      text: String,
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
    Meteor.users.update({_id: Meteor.userId()}, {$set: {color: color}})
  }
});