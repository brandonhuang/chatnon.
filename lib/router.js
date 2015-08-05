Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.render('channel', {
    data: function() {
      templateData = { messages: messages.find({}, {sort: {createdAt: -1}, limit: 100}).fetch().reverse() };
      return templateData;
    }
  });
});