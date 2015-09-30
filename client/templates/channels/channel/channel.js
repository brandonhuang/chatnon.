Template.channel.helpers({
});

Template.channel.onRendered(function() {
  //Scroll chat down onload - ghetto

  Tracker.afterFlush(function() {
    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
  })
});
