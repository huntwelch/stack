# edit user data
# show users
# show games
# load/start games?


class User extends Spine.Model
  @configure "email", "uname", "password", "games"
  @extend Spine.Model.Ajax

  @url: "/users"

  

class Users extends Spine.Controller
  el: "#menu"

  constructor: ->
    super

  elements:
    "#loginform": "loginform"
    "#signupform": "signupform"

  events:
    "click #signup .submit": "signup"

  signup: (event) ->
    console.log("Boom")
    user = User.fromForm(@signupform)
    user.save()


$ ->
  users = new Users()
  
