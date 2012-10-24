class Board extends Spine.Model
  @configure "size", "state"

  newboard: ->
    @state = (Array(@size) for num in [@size..0])

class Boards extends Spine.Controller
  el: "#board"
  space: 40
  constructor: ->
    super
    @size--
    @render()

  line: (index) ->
    element = $("<line class='vertical' />")
      .css left: index*@space + @space/2
    @append( element )

    element = $("<line class='horizontal' />")
      .css top: index*@space + @space/2
    @append( element )

  point: (points) ->
    renderpoints = []
    for x in points
      do(x) ->
        for y in points
          element = $("<dot/>")
            .css left: x*@space, top: y*@space
          renderpoints.push(element)

    @append( renderpoint ) for renderpoint in renderpoints 

  render: ->
    board = new Board( size: @size )
    board.newboard()
    dimension = @size*@space

    if @size > 11 then points = [3, @size/2, @size-3] else points = [@size/2]

    @el.css width: dimension, height: dimension 
    @line(iter) for column,iter in board.state
    @point(points) 

  events:
    "mousemove": "mouser" 

  mouser: ->
    offset = $( @el ).offset() 
    x = event.x - offset.left
    y = event.y - offset.top 
    
    $shadow = $("shadow")
  
    snapx = x-x%@space
    snapy = y-y%@space

    $shadow.css left: snapx, top: snapy 
    $("#mover").css left: x-@space/2, top: y-@space/2

    pos = [snapx/40,snapy/40]
    console.log(pos)


class Piece extends Spine.Model
  @configure "color", "position"


$ ->
  board = new Boards( size: 19 )

