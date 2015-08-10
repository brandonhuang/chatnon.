Meteor.onConnection(function(conn) {
    console.log(conn.clientAddress, conn.httpHeaders['x-forwarded-for']);
});