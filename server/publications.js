Meteor.publish('users', function() {
  return Meteor.users.find({}, {
    fields: {
      '_id': 1,
      'username': 1,
      'color': 1,
      'level': 1,
      'exp': 1,
      'status': 1
    }
  });
});

Meteor.publish('messages', function() {
  return messages.find();
});