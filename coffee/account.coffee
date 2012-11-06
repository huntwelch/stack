# edit user data
# show users
# show games
# load/start games?


class User extends Spine.Model
  @configure "username", "email", "games"

class Login extends Spine.Controller
  constructor: ->
    @routes:
      "/login/": ->
        # serialize form
        console.log("login")
