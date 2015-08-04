Template.messageForm.events({
  'submit form': function(e) {
    var message = {
      text: $('#m').val()
    }

    $('#m').val("");

    Meteor.call('messageInsert', message, function(error) {
      if(error) throw error;
    });

    return false;
  }
});