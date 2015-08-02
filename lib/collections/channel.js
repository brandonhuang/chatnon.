messages = new Mongo.Collection('messages');

Meteor.methods({
  messageInsert: function(messageAttributes) {
    // check(Meteor.userId(), String);

    check(messageAttributes, {
      text: String
    });

    var message = _.extend(messageAttributes, {
      createdAt: new Date()
    });

    var messageId = messages.insert(message);
  }
});