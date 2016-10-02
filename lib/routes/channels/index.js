Router.route('/', {
  action: function() {
    Router.go("/chatnon", {}, {replaceState: true});
  }
});
