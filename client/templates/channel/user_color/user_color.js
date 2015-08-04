Template.userColor.helpers({
  color: function() {
    return Meteor.user().color;
  }
});

Template.userColor.events({
  'click': function(e) {
    Meteor.call('newColor', function(error) {
      if(error) throw error;
    });
  }
})