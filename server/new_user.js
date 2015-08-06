Accounts.onCreateUser(function(options, user) {
  user.color = generateColor();
  user.level = 1;
  user.exp = 0;
  user.location = {};

  // Turnicate usernames if greater than 14
  if(user.username.length > 14) {
    console.log(user.username)
    user.username = user.username.slice(0, 14);
  }

  if(options.profile) {
    user.profile = options.profile;
  }

  return user;
});