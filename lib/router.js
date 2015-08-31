
Router.configure({
  layoutTemplate: 'layout'
});

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

Router.route('/:channel', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('channels'),
      Meteor.subscribe('messages', this.params.channel),
      Meteor.subscribe('channelStatus', this.params.channel),
      Meteor.subscribe('users')
    ];
  },
  onBeforeAction: function() {
    // route validations
    if(this.params.channel.length > 20) {
      this.params.channel = false;
    }
    if(!/^[a-z0-9]*$/gi.test(this.params.channel)) {
      this.params.channel = false;
    }

    Session.set('channel', this.params.channel);
    this.next();
  },
  action: function() {
    if(!this.params.channel) {
      this.render('urlError');
    } else {
      this.render('channel', {
        data: function() {
          templateData = {
            messages: messages.find({username: {$nin: Session.get('muteList')}}, {sort: {createdAt: 1}})
          };
          return templateData;
        }
      });
    }

  }
});