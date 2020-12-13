import {Machine, assign, spawn, send} from 'xstate'
import createSquareMachine from './SquareMachine'
const squareData = [
    {
        id: '1',
        value: 'pikachu'
    },
    {
        id: '2',
        value: 'piplub'
    },
    {
        id: '3',
        value: 'butterfree'
    },
    {
        id: '4',
        value: 'charizard'
    }
]
// create squaremachine to store selected/not
// check delayed transition
const gameMachine = Machine({
    id: 'game',
    initial: 'start',
    context: {
        squares: [],
        selectedSquareId: undefined,
        disabledSquares: []
    },
    states: {
        start: {
            always: {
                target: 'idle'
            },
            entry: 'populate'
        },
        idle: {
            always: {
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
                COMPARE: {
                    target: 'idle',
                    actions: [
                        'removeIfMatched'
                    ]
                }
            }
        },
        won: {}
    }
}, {
    guards: {
        didWin: (context, event) => {
            return (context.disabledSquares.length === context.squares.length)
        }
    },
    actions: {
        populate: assign((context, event) => {
            const squares = squareData.map(s => {
                const square = spawn(createSquareMachine(s))
                return (
                    square
                )
            })
            return ({
                ...context,
                squares: squares
            })
        }),
        select: (context, event) => {
            if(!context.disabledSquares.find(i => i === event.squareId)) {
                assign({
                    selectedSquareId: event.squareId
                })
                send('SHOW', {
                    to: (context => context.squares.find(s => s.id === event.squareId))
                })  
            }
            
        },
        removeSquareSelection: (context, event) => {
            assign({
                selectedSquare: null
            })
            if(context.selectedSquareId) {
                send('HIDE', {
                    to: (context => context.squares.find(s => s.id === context.selectedSquareId))
                }) 
            } 
        },
        removeIfMatched: (context, event) => {
            const selectedSquare = context.squares.find(s => s.id === context.selectedSquareId)
            const square = context.squares.find(s => s.id === event.squareId)
            send('SHOW', {
                to: square
            })  
            setTimeout(() => {
                if(square.value === selectedSquare.value) {
                    assign({
                        disabledSquares: [...disabledSquares, selectedSquare.id, square.id]
                    })
                    send('DISABLE', {
                        to: square
                    })
                    send('DISABLE', {
                        to: selectedSquare
                    })
                }
                else {
                    send('HIDE', {
                        to: square
                    })
                }
            }, 3000);

        }
    }
})

export default gameMachine