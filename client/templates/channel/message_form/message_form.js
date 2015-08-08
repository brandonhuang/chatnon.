Template.messageForm.events({
  'submit form': function(e) {
    e.preventDefault();

    var message = {
      text: $('#m').val()
    }

    $('#m').val("");

    // Validate
    if(isEmpty(message.text)) return;



    Meteor.call('messageInsert', message, function(error) {
      if(error) throw error;
    });
  }
});

function isEmpty(text) {
  if(text.trim()) {
    return false;
  } else {
    return true;
  }
}