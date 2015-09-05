Router.route('/', {
  action: function() {
    Router.go("/index", {}, {replaceState: true});
  }
});