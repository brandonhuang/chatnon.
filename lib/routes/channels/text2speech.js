Router.route('/text2speech', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('messages', 'text2speech'),
      Meteor.subscribe('channelStatus', 'text2speech'),
      Meteor.subscribe('users')
    ];
  },
  onBeforeAction: function() {
    Session.set('channel', 'text2speech');
    this.next();
  },
  action: function() {
    this.render('textToSpeech', {
      data: function() {
        templateData = {
          messages: messages.find({username: {$nin: Session.get('muteList')}}, {sort: {createdAt: 1}})
        };
        return templateData;
      }
    });
  }
});