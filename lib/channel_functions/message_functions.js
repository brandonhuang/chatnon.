muteUser = function(e) {
  if(!Meteor.user() || Meteor.user().username === this.username) return;
  if(!confirm('Mute this user?')) return;

  // Clone array
  var muteList = Session.get("muteList").slice();

  if(muteList.indexOf(this.username) == -1) muteList.push(this.username);

  Session.set('muteList', muteList);
}

userLevel = function() {
  // Anon users are level 0
  if(!Meteor.users.findOne({username: this.username})) return 0;

  var exp = Meteor.users.findOne({username: this.username}).exp || 0;

  var level = 1;
  var comparator = 10;
  while(exp > comparator) {
    comparator = Math.pow(level * 10, 1.5);
    level += 1;
    exp -= comparator;
  }

  return level;
}
