Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('messages'),
      Meteor.subscribe('users')
    ];
  },
  fastRender: true,
  action: function() {
    this.render('channel', {
      data: function() {
        templateData = {
          messages: messages.find({}, {sort: {createdAt: -1}, limit: 100}).fetch().reverse()
        };
        return templateData;
      }
    });
  }
});