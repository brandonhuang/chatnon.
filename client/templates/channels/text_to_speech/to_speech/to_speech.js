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
    $('#messages').stop().animate({scrollTop: $('#messages').prop("scrollHeight") }, 500, 'swing', function() { 
    });
  }
  // speechSynthesize if messages are new
  messageNum++;
  if(messageNum >= messages.find().count()) {
    var cancel = false;
    var utterance = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    utterance.voice = voices[2];
    utterance.voiceURI = 'native';
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1.35;
    utterance.text = Template.parentData(0).text;
    utterance.lang = 'en-US';
    utterance.onend = function() {
      speechSynthesis.cancel();
      cancel = true;
    }

    // Set timeout fixes things * don't worry this is the only good solution
    Meteor.setTimeout(function() {
      window.speechSynthesis.speak(utterance);
    }, 0);

    // If speech has not ended after 8 seconds, force end.
    Meteor.setTimeout(function() {
      if(!cancel) {
        speechSynthesis.cancel();
      }
    }, 8000);
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

// speech function fix