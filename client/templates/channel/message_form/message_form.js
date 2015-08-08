var msgCount = 0;
var msgCache = [];

Template.messageForm.events({
  'submit form': function(e) {
    e.preventDefault();

    var message = {
      text: $('#m').val()
    }

    $('#m').val("");

    // Validate
    if(isEmpty(message.text)) return;
    if(isTooFast(msgCount)) return;
    if(isRepetitive(message.text)) return;

    msgCount++;
    cacheMessage(message.text);

    Meteor.call('messageInsert', message, function(error) {
      if(error) throw error;
    });
  }
});

setInterval(function() {
  if(msgCount > 0) msgCount--;
  console.log(msgCache);
}, 3000);

function cacheMessage(text) {
  if(msgCache.length < 3) {
    msgCache.push(text);
  } else {
    msgCache.shift();
    msgCache.push(text);
  }
}

function isTooFast(msgCount) {
  if(msgCount > 3) {
    return true;
  } else {
    return false;
  }
}

function isEmpty(text) {
  if(text.trim()) {
    return false;
  } else {
    return true;
  }
}

function isRepetitive(text) {
  if(msgCache.length === 3) {
    for(var i = 0; i < msgCache.length; i++) {
      if(msgCache[i] !== msgCache[0]) {
        return false;
      }
    }
    msgCount += 5;
    msgCache.shift();
    return true;
  }
  return false;
}