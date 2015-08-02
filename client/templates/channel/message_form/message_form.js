Template.messageForm.events({
  'submit form': function(e) {
    var message = {
      text: $(e.target).find('#m').val()
    }

    $(e.target).find('#m').val("");

    Meteor.call('messageInsert', message, function(error) {
      if(error) throw error;
    });

    return false;
  }
});