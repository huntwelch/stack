# edit user data
# show users
# show games
# load/start games?


class User extends Spine.Model
  @configure "User", "action", "uname", "email", "password", "games"
  @extend Spine.Model.Ajax

  @url: "/users"
  
User.bind 'save', (user) ->
  console.log(user)

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
    user = User.fromForm(@signupform)
    user.save()
    console.log(user)


$ ->
  users = new Users()
  
