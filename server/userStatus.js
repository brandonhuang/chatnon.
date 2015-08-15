// Meteor.onConnection(function(connection) {
//   connection.onClose(function() {
//     console.log('disconnected');
//   });
//   console.log('connected', connection);
// });

Accounts.onLogin(function(data) {
  data.connection.onClose(function() {
    console.log(data.user.username, 'disconnected');
  });

  console.log(data.user.username, 'connected')
})