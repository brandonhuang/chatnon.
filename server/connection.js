Meteor.onConnection(function(conn) {
  // If IP address is behind a reverse proxy (cloudflare) fetch originating user ip
  if(conn.httpHeaders['x-forwarded-for']) {
    conn.clientAddress = conn.httpHeaders['x-forwarded-for'];
  }
});