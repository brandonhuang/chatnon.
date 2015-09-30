var windowState = true;
var firstLoad = true;

$(window).blur(function() {
  windowState = false;
});
$(window).focus(function() {
  windowState = true;
  $('#m').focus();
  $('title').text(Session.get('channel'));
});

Template.message.onCreated(function() {
  if(!windowState) {
    $('title').text('! ' + Session.get('channel'));
  }
});

Template.message.onRendered(function() {
  var currentScrollBottom = $('#messages').scrollTop() + $('#messages').height();
  var currentScrollHeight = $('#messages').prop("scrollHeight");

  if(currentScrollBottom >= currentScrollHeight - 50) {
    $('#messages').stop().animate({scrollTop: $('#messages').prop("scrollHeight") }, 500, 'swing', function() { 
    });
  }
});

Template.message.helpers({
  level: userLevel
});

Meteor.startup(function() {
  Session.setDefault('muteList', []);
});

Template.message.events({
  'click .tag': muteUser
});