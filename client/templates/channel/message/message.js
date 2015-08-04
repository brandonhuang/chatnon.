Meteor.subscribe('users');

// There seem to be some problems with onRender being called twice
// onCreated is a quick fix to a problem I don't know how to solve elegantly

Template.message.onCreated(function() {
  var currentScrollBottom = $('#messages').scrollTop() + $('#messages').height();
  var currentScrollHeight = $('#messages')[0].scrollHeight;

  if(currentScrollBottom >= currentScrollHeight - 100) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  }
});

Template.message.onRendered(function() {
  var currentScrollBottom = $('#messages').scrollTop() + $('#messages').height();
  var currentScrollHeight = $('#messages')[0].scrollHeight;

  if(currentScrollBottom >= currentScrollHeight - 100) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
  }
});