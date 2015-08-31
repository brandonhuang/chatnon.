var windowState = true;
var firstLoad = true;
var messageNum = 0;

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

  // speechSynthesis if messages
  messageNum++;
  if(messageNum >= messages.find().count()) {
    var voices = window.speechSynthesis.getVoices();
    var text = new SpeechSynthesisUtterance(Template.parentData(0).text);

    text.pitch = 1.25;

    window.speechSynthesis.speak(text);
  }
});

Template.toSpeech.helpers({
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

Template.toSpeech.events({
  'click .tag': function(e) {
    if(Meteor.user().username === this.username) return;
    if(!confirm('Mute this user?')) return;

    // Clone array
    var muteList = Session.get("muteList").slice();

    if(muteList.indexOf(this.username) == -1) muteList.push(this.username);

    Session.set('muteList', muteList);
  }
});