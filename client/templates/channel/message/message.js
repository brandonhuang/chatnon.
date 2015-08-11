var windowState = true;
var firstLoad = true;

$(window).blur(function() {
  windowState = false;
});
$(window).focus(function() {
  windowState = true;
  $('#m').focus();
  $('title').text('chatnon.');
});

Template.message.onCreated(function() {
  if(!windowState) {
    $('title').text('! chatnon.');
  }
});

Template.message.onRendered(function() {
  var currentScrollBottom = $('#messages').scrollTop() + $('#messages').height();
  var currentScrollHeight = $('#messages').prop("scrollHeight");

  if(currentScrollBottom >= currentScrollHeight - 50) {
    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
  }
});

Template.message.helpers({
  level: function() {
    return Meteor.users.findOne({username: this.username}).level;
  }
});

Meteor.startup(function() {
  Session.setDefault('muteList', []);
});

Template.message.events({
  'click .tag': function(e) {
    if(Meteor.user().username === this.username) return;
    if(!confirm('Mute this user?')) return;

    // Clone array
    var muteList = Session.get("muteList").slice();

    if(muteList.indexOf(this.username) == -1) muteList.push(this.username);

    Session.set('muteList', muteList);
  }
});