Router.route('/pxlstrike', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('messages', 'pxlstrike'),
      Meteor.subscribe('channelStatus', 'pxlstrike'),
      Meteor.subscribe('users')
    ];
  },
  onBeforeAction: function() {
    Session.set('channel', 'pxlstrike');
    this.next();
  },
  action: function() {
    this.render('pxlstrike', {
      data: function() {
        templateData = {
          messages: messages.find({username: {$nin: Session.get('muteList')}}, {sort: {createdAt: 1}})
        };
        return templateData;
      }
    });
  },
  onAfterAction: function() {
    SEO.set({
      title: 'pxlstrike'
    });
  }
});
