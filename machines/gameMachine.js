import {Machine, assign} from 'xstate'

const squares = [
    {
        id: '1',
        value: 'asdf',
        show: false
    },
    {
        id: '2',
        value: 'asdf',
        show: false
    },
    {
        id: '3',
        value: 'asdf',
        show: false
    },
    {
        id: '4',
        value: 'asdf',
        show: false
    }
]
// create squaremachine to store selected/not
// check delayed transition
const gameMachine = Machine({
    id: 'game',
    initial: 'idle',
    context: {
        squares: squares,
        selectedSquareId: undefined,
        disabledSquares: []
    },
    states: {
        idle: {
            always: {
                target: 'won',
                cond: "didWin"
            },
            entry: 'hideSquares',
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
                COMPARE: {
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
            return (context.disabledSquares.length === context.squares.length)
        }
    },
    actions: {
        // hide squares
        show: (context, id) => {
           const square =  context.squares.find(s => s.id === id)
        //    square.show = true;
        },
        hide: (context, id) => {
            const square =  context.squares.find(s => s.id === id)
            square.show = false;
         },
        select: (context, event) => {
            if(!context.disabledSquares.find(i => i === event.squareId)) {
                assign({
                    selectedSquareId: event.squareId
                })
                show(context, event.sqareId)
                
            }
            
        },
        removeSquareSelection: () => {
            assign({
                selectedSquare: null
            })
        },
        removeIfMatched: (context, event) => {
            const selectedSquare = context.squares.find(s => s.id === context.selectedSquareId)
            const square = context.squares.find(s => s.id === event.squareId)
            // square.show = true;
            // after delay
            if(square.value === selectedSquare.value) {
                // disabled.push(sq, selsq)
            }

        }
    }
})

export default gameMachine