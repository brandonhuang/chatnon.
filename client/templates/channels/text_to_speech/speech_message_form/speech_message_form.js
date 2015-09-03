var msgCount = 0;
var msgCache = [];
var timeout = false;

Template.speechMessageForm.events({
  'submit form': function(e) {
    e.preventDefault();

    var message = {
      text: $('#m').val().trim(),
      channel: Session.get('channel')
    }

    $('#m').val("");

    // check timeout
    if(timeout) return;

    // check validations
    if(!validate(message)) return;

    msgCount++;
    cacheMessage(message.text);

    Meteor.call('messageInsert', message, function(error) {
      if(error) throw error;
    });
  }
});

setInterval(function() {
  if(msgCount > 0) msgCount--;
}, 5000);

function validate(message) {
  // punitive validations
  if(isRepetitive(message.text)) {
    userTimeout(30000);
    alert('You have been timed out for 30 seconds');
  }

  // non-punitive validations
  if(isEmpty(message.text)) return false;
  if(isTooFast(msgCount)) return false;
  if(isTooLong(message.text)) return false;

  return true;
}

function userTimeout(duration) {
  // TODO: increase duration depending on infractions and a users upvotes/downvotes
  timeoutDuration = duration;

  timeout = true;
  setTimeout(function() {
    timeout = false;
  }, 30000);
}

// Validation functions
function cacheMessage(text) {
  if(msgCache.length < 3) {
    msgCache.push(text);
  } else {
    msgCache.shift();
    msgCache.push(text);
  }
}

function isTooFast(msgCount) {
  if(msgCount > 2) {
    return true;
  } else {
    return false;
  }
}

function isEmpty(text) {
  if(text) {
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

function isTooLong(text) {
  if(text.length > 100) {
    return true;
  }
  return false;
}