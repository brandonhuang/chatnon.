muteUser = function(e) {
  if(Meteor.user().username === this.username) return;
  if(!confirm('Mute this user?')) return;

  // Clone array
  var muteList = Session.get("muteList").slice();

  if(muteList.indexOf(this.username) == -1) muteList.push(this.username);

  Session.set('muteList', muteList);
}