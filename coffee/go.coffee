class Board extends Spine.Model
  @configure "size", "state"

  newboard: ->
    @state = (Array(@size) for num in [@size-1..0])

class Boards extends Spine.Controller
  el: "#board"
  constructor: ->
    super

  line: (index) ->
    element = $("<line class='vertical' />")
      .css left: index*40
    @append( element )

    element = $("<line class='horizontal' />")
      .css top: index*40
    @append( element )

  render: ->
    board = new Board( size: @size )
    board.newboard()
    dimension = --@size*40

    @el.css width: dimension, height: dimension 

    @line(iter) for column,iter in board.state

class Piece extends Spine.Model
  @configure "color", "position"

$ ->
  board = new Boards( size: 19 )
  board.render()

