Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('messages', 'index'),
      Meteor.subscribe('users')
    ];
  },
  onRerun: function() {
    if(Meteor.userId()) {
      Meteor.call('connectChannel', 'index');
    }
    this.next();
  },
  onStop: function() {
    Meteor.call('disconnectChannel', 'index');
  },
  onBeforeAction: function() {
    if(Meteor.userId()) {
      UserSession.set(sessionId(), 'index');
    }
    this.next();
  },
  action: function() {
    this.render('channel', {
      data: function() {
        templateData = {
          messages: messages.find({}, {sort: {createdAt: 1}})
        };
        return templateData;
      }
    });
  }
});

Router.route('/:channel', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('messages', this.params.channel),
      Meteor.subscribe('users')
    ];
  },
  onRerun: function() {
    console.log('rerun');
    if(Meteor.userId()) {
      Meteor.call('connectChannel', this.params.channel);
    }
    this.next();
  },
  onStop: function() {
    Meteor.call('disconnectChannel', this.params.channel);
  },
  onBeforeAction: function() {
    if(Meteor.userId()) {
      UserSession.set(sessionId(), this.params.channel);
    }
    this.next();
  },
  action: function() {
    this.render('channel', {
      data: function() {
        templateData = {
          messages: messages.find({}, {sort: {createdAt: 1}})
        };
        return templateData;
      }
    });
  }
});