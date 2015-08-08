var msgCount = 0;

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

    msgCount++;

    Meteor.call('messageInsert', message, function(error) {
      if(error) throw error;
    });
  }
});

setInterval(function() {
  if(msgCount > 0) msgCount--;
}, 3000);

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