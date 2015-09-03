Accounts.validateNewUser(function (user) {
  if(user.username.length > 14) {
    throw new Meteor.Error(403, "Username must be shorter than 14 characters");
  }
  if(Meteor.users.findOne({usernameLower: user.username.toLowerCase()})) {
    throw new Meteor.Error(403, "Username already exists");
  }

  if(user.username === 'chatnon') {
    throw new Meteor.Error(403, 'The name chatnon is reserved.');
  }

  if(swearjar.profane(user.username)) {
    throw new Meteor.Error(403, 'Your name must not contain profanities');
  }

  return true
});

Accounts.onCreateUser(function(options, user) {
  user.color = generateColor();
  user.location = {};
  user.channels = {};

  // Create a lower case version of username
  user.usernameLower = user.username.toLowerCase();

  if(options.profile) {
    user.profile = options.profile;
  }

  return user;
});