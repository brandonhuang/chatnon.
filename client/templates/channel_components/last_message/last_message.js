Template.lastMessage.helpers({
  time: function() {
    var lastMessage = messages.findOne({}, {sort: {createdAt: -1}});
    var milliseconds = new Date(new Date(TimeSync.serverTime(null, 1000)) - lastMessage.createdAt);

    if(milliseconds < 60000) {
      return milliseconds.getSeconds() + ' seconds';
    } else if(milliseconds < 3600000) {
      return milliseconds.getMinutes() + ' minutes';
    } else {
      return milliseconds.getHours() + ' hours'
    }
  }
});