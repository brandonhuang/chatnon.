Template.channel.helpers({
});

Template.channel.onRendered(function() {
  //Scroll chat down onload - ghetto

  Tracker.afterFlush(function() {
    setTimeout(function() {
      $(".nano").nanoScroller();

      $(".nano").nanoScroller({ scroll: 'bottom' });
    }, 100);
  })
});
