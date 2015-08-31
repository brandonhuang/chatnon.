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
    $(".nano").nanoScroller();
    $(".nano").nanoScroller({ scroll: 'bottom' });
  }
});

Template.message.helpers({
  level: function() {
    var exp = Meteor.users.findOne({username: this.username}).channels[this.channel].exp || 0;

    var level = 1;
    var comparator = 10;
    while(exp > comparator) {
      comparator = Math.pow(level * 10, 1.5);
      level += 1;
      exp -= comparator;
    }

    return level;
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

    if(muteList.indexOf(this.status.lastLogin.ipAddr) == -1) muteList.push(this.username);

    Session.set('muteList', muteList);
  }
});