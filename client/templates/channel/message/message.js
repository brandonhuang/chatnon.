Meteor.subscribe('users');

var windowState = true;

$(window).blur(function() {
  windowState = false;
});
$(window).focus(function() {
  windowState = true;
  $('#m').focus();
  $('title').text('chatnon.');
});

// There seem to be some problems with onRender being called twice
// onCreated is a quick fix to a problem I don't know how to solve elegantly
Template.message.onCreated(function() {
  if(!windowState) {
    $('title').text('! chatnon.');
  }
});

Template.message.onRendered(function() {

  var currentScrollBottom = $('#messages').scrollTop() + $('#messages').height();
  var currentScrollHeight = $('#messages')[0].scrollHeight;

  if(currentScrollBottom >= currentScrollHeight - 100) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  }
});

Meteor.startup(function() {
  setTimeout(function() {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  }, 2000);
});