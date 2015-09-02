var windowState = true;
var firstLoad = true;
var messageNum = 0;

Tracker.autorun(function() {
  if(Session.get('channel')) {
    messageNum = 0;
  }
});

$(window).blur(function() {
  windowState = false;
});
$(window).focus(function() {
  windowState = true;
  $('#m').focus();
  $('title').text('chatnon.');
});

Template.toSpeech.onCreated(function() {
  if(!windowState) {
    $('title').text('! chatnon.');
  }
});

Template.toSpeech.onRendered(function() {
  var currentScrollBottom = $('#messages').scrollTop() + $('#messages').height();
  var currentScrollHeight = $('#messages').prop("scrollHeight");

  if(currentScrollBottom >= currentScrollHeight - 50) {
    $(".nano").nanoScroller();
    $(".nano").nanoScroller({ scroll: 'bottom' });
  }

  // speechSynthesize if messages are new
  messageNum++;
  if(messageNum >= messages.find().count()) {
    var voices = window.speechSynthesis.getVoices();
    var text = new SpeechSynthesisUtterance(Template.parentData(0).text);

    text.pitch = 1.25;

    window.speechSynthesis.speak(text);
  }
});

Template.toSpeech.helpers({
  level: userLevel
});

Meteor.startup(function() {
  Session.setDefault('muteList', []);
});

Template.toSpeech.events({
  'click .tag': muteUser
});