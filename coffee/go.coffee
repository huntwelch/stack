class Board extends Spine.Model
  @configure "size", "state"
  
  newboard: ->
    @state = (Array(@size+1) for num in [@size..0])

class Boards extends Spine.Controller
  el: "#board"
  space: 20
  move: 0
  turn: 0
  opponent: 1
  turncode: ["black","white"]

  constructor: ->
    super
    @size--
    @render()
    @xcheck = [0,0,-1,1]
    @ycheck = [-1,1,0,0]
    @mover.className = @turncode[@turn]
 

  elements:
    "#mover": "mover"
    "shadow" : "shadow"


  events:
    "mousemove": "moving"
    "mouseout": "hide"
    "mouseover": "show"
    "click": "place"
 

  line: (index) ->
    element = $("<line class='vertical' />")
      .css left: index*@space
    @append( element )

    element = $("<line class='horizontal' />")
      .css top: index*@space
    @append( element )


  point: (points) ->
    renderpoints = []
    for x in points
      do(x, @space) ->
        for y in points
          element = $("<dot/>")
            .css left: x*@space, top: y*@space
          renderpoints.push(element)

    @append( renderpoint ) for renderpoint in renderpoints


  render: ->
    @board = new Board( size: @size )
    @board.newboard()
    @dimension = @size*@space

    if @size > 11 then points = [3, @size/2, @size-3] else points = [@size/2]

    @el.css width: @dimension, height: @dimension
    @line(iter) for column,iter in @board.state
    @point(points)


  hide: ->
    @shadow.hide()
    @mover.hide()
    @position = false


  show: ->
    @shadow.show()
    @mover.show()


  moving: ->
    offset = $( @el ).offset()
    x = event.x - offset.left + @space/2
    y = event.y - offset.top + @space/2
    
    # Limits
    outer = @dimension + @space/2
    inner = 0
    x = outer if x > outer
    y = outer if y > outer
    x = inner if x < inner
    y = inner if y < inner

    @snap = [x-x%@space, y-y%@space]

    @shadow.css left: @snap[0], top: @snap[1] 
    @mover.css left: x-@space/2, top: y-@space/2

    @position = [@snap[0] / @space, @snap[1] / @space]
    $('#report').html(@position.toString())


  renderpiece: ->
    piece = $("<piece/>").addClass(@turncode[@turn])
    piece.id = @position.join()
    piece.css left: @snap[0], top: @snap[1]
    @append( piece )


  place: ->
    location = @board.state[@position[0]][@position[1]]

    return if location isnt undefined

    @aggress()

    return if not @liberty()

    @renderpiece()
    @board.state[@position[0]][@position[1]] = @turn
    @move++
    @turn = @move%2
    @opponent = (@move + 1)%2
    
    @mover.className = @turncode[@turn]


  neighbor: (x,y,xc,yc) ->
    return false if y+yc == -1 or y+yc == @size+1 or x+xc == -1 or x+xc == @size+1
    return @board.state[x+xc][y+yc]

  
  aggress: (location) ->
    x = @position[0]
    y = @position[1]

    for xc, iter in @xcheck
      yc = @ycheck[iter]
      neighbor = @neighbor(x,y,xc,yc)
      continue if neighbor is undefined

      if neighbor is @opponent
        @liberty(@opponent, [x+xc, y+yc])


  liberty: (side = @turn, position = @position) ->
    structure = [position]
    step = 0
    liberties = false

    # Iterate over structure
    while step < structure.length
      x = structure[step][0]
      y = structure[step][1]

      for xc, iter in @xcheck
        yc = @ycheck[iter]
        neighbor = @neighbor(x,y,xc,yc)
        continue if neighbor is false
        if neighbor is undefined
          liberties = true
          break

        if neighbor == side
          test = [x+xc, y+yc].join()
          existing = false
          for piece in structure
            if piece.join() == test
              existing = true
              break

          structure.push([x+xc, y+yc]) if not existing

      step++

    # todo: check for ko
    if side != @turn and !liberties
      for piece in structure
        @board.state[piece[0]][piece[1]] = undefined
        @remove( $("#" + piece.join()) )

    return liberties


$ ->
  board = new Boards( size: 19 )

