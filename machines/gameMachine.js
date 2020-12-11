import {Machine, assign} from 'xstate'

const squares = [
    {
        id: '1',
        content: 'asdf',
        selected: false
    },
    {
        id: '2',
        content: 'asdf',
        selected: false
    },
    {
        id: '3',
        content: 'asdf',
        selected: false
    },
    {
        id: '4',
        content: 'asdf',
        selected: false
    }
]
// create squaremachine to store selected/not
// check delayed transition
const gameMachine = Machine({
    id: 'game',
    initial: 'idle',
    context: {
        squares: squares,
        selectedSquare: undefined
    },
    states: {
        idle: {
            entry: {
                target: 'won',
                cond: "didWin"
            },
            // add transition to check - if no active squares in context, transition to game won
            // after: {
            //     1000: 'removeSquareSelection' //wrong
            // },
            on: {
                SELECT: {// will be called by squareMachine
                    target: 'selected',
                    actions: [
                        'select'
                    ]
                }
            }
        },
        selected: {
            on: {
                SELECTSECONDSQUARE: {
                    target: 'idle',
                    actions: [
                        'removeIfMatched'
                    ]
                }
            }
        }
    }
}, {
    guards: {
        didWin: (context, event) => {
            return context.squares.lenght === 0
        }
    },
    actions: {
        select: (context, event) => {
            assign({
                selectedSquare: event.squareId
            })
        },
        removeSquareSelection: () => {
            assign({
                selectedSquare: null
            })
        },
        removeIfMatched: (context, event) => {
            console.log(context.selectedSquare, event.square)
            if(context.selectedSquare.value === event.square.value) {
                // remove them from context and remove the squares
            }


        }
    }
})

export default gameMachine