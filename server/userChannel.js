// This code tracks the user connecting and reconnecting to different channels
// The rest of the code is contained in the router.js

Accounts.onLogin(function(data) {
  data.connection.onClose(function() {
    var channel = UserSession.get(data.connection.id, data.user._id);
    UserSession.delete(data.connection.id, data.user._id);
    if(channel === undefined || channel === 'undefined') return;
    Meteor.call('disconnectChannel', channel, data.user._id);
  });
})

