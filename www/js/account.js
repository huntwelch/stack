// Generated by CoffeeScript 1.4.0
(function() {
  var Login, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.configure("username", "email", "games");

    return User;

  })(Spine.Model);

  Login = (function(_super) {

    __extends(Login, _super);

    function Login() {
      this.routes({
        "/login/": function() {
          return console.log("login");
        }
      });
    }

    return Login;

  })(Spine.Controller);

}).call(this);