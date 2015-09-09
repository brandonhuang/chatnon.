Template.lastMessage.helpers({
  time: function() {
    var lastMessage = messages.findOne({channel: Session.get('channel')}, {sort: {createdAt: -1}});
    var milliseconds = new Date(new Date(TimeSync.serverTime(null, 1000)) - lastMessage.createdAt);

    if(milliseconds < 5000) return 'just now';
    if(milliseconds < 60000) return milliseconds.getSeconds() + ' seconds ago';
    if(milliseconds < 120000) return milliseconds.getMinutes() + ' minute ago'
    if(milliseconds < 3600000) return milliseconds.getMinutes() + ' minutes ago';
    if(milliseconds < 7200000) return milliseconds.getHours() + 'hour ago'
    return (milliseconds/3600000) + ' hours ago';
  }
});