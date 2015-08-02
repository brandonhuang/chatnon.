Template.channel.helpers({
  messages: function() {
    return messages.find({}, {sort: {createdAt: 1}, limit: 100});
  }
});