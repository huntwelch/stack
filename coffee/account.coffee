# edit user data
# show users
# show games
# load/start games?


class User extends Spine.Model
  @configure "User", "action", "uname", "email", "password", "error"
  @extend Spine.Model.Ajax

  @url: "/users"
  
User.bind 'save', (user) ->
  return if user.action is "signup" or user.action is "login"
  if user.error
    alert(user.error)
    return

  if user.action is "signedup"
    $('.loggedout').hide()
    $('.loggedin').show()


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


$ ->
  users = new Users()
 
