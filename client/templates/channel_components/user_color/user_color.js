if(!Session.get('color')) {
  Meteor.call('generateColor', function(err, color) {
    if(err) throw err;

    Session.setPersistent('color', color);
  });
}

Template.userColor.helpers({
  color: function() {
    if(Meteor.user()) {
      return Meteor.user().color;
    } else {
      return Session.get('color');
    }
  }
});

Template.userColor.events({
  'click': function(e) {
    if(Meteor.user()) {
      Meteor.call('newUserColor');
    }
  }
})