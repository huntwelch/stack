def create_state_history(history):
    history = history.split("|")

    states = []
    for i in range(19):
        col = []
        for i in range(19):
            col.append(' ')
        states.append(col)

    for move in history:
        print move
        player,x,y = move.split(",")
        states[int(x)][int(y)] = player

    return states

hist = "0,3,9|1,4,2|0,9,9"

for state in create_state_history(hist):
    print state

