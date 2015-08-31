Router.route('/', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('messages', 'index'),
      Meteor.subscribe('channelStatus', 'index'),
      Meteor.subscribe('users')
    ];
  },
  onBeforeAction: function() {
    Session.set('channel', 'index');
    this.next();
  },
  action: function() {
    this.render('channel', {
      data: function() {
        templateData = {
          messages: messages.find({username: {$nin: Session.get('muteList')}}, {sort: {createdAt: 1}})
        };
        return templateData;
      }
    });
  }
});