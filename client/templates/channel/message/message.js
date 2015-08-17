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
    var channel = Session.get('channel');
    var exp = Meteor.users.findOne({username: this.username}).channels[channel].exp;

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