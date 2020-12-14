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
        value: 'pikachu'
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
        selectedSquare: {
            id: null,
            value: null
        },
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
                // SELECT: {
                //     target: 'selected',
                //     actions: [
                //         'select'
                //     ]
                // }
                SELECT_SQUARE: {
                    target: 'selected',
                    actions: [
                        'selectSquare'
                    ]
                }
            }
        },
        selected: {
            on: {
                SELECT_SQUARE: {
                    target: 'idle',
                    actions: [
                        'disableIfMatched'
                    ]
                }
            }
        },
        won: {}
    }
}, {
    guards: {
        didWin: (context, event) => {
            console.log(context.disabledSquares.length)
            // console.log(context, event)
            return (context.disabledSquares.length === context.squares.length)
        }
    },
    actions: {
        populate: assign((context, event) => {
            const squares = squareData.map(s => {
                const square = spawn(createSquareMachine(s), s.id)
                return (
                    square
                )
            })
            return ({
                ...context,
                squares: squares
            })
        }),
        // select: (context, event) => {
        //     if(!context.disabledSquares.find(i => i === event.squareId)) {
        //         assign({
        //             selectedSquareId: event.squareId
        //         })
        //         send('SHOW', {
        //             to: (context => context.squares.find(s => s.id === event.squareId))
        //         })  
        //     }
        selectSquare: assign({
            selectedSquare: (context, event) => {
                console.log(context);
                return {
                    id: event.squareId,
                    value: event.squareValue
                }
            } // pass data too
        }),
        disableIfMatched: assign({
            disabledSquares: (context, event) => {
                console.log(context, event)
                let d = [...context.disabledSquares]
                const selectedSquare = context.selectedSquare
                const square = {id: event.squareId, value: event.squareValue}
                console.log(square.value, selectedSquare.value) // value is undefined // maybe store selected square's value here 
                if(square.value === selectedSquare.value) {
                    d.push(selectedSquare.id, square.id)
                }
                return d;
                
            }
        }),

            
        // },
        // removeSquareSelection: (context, event) => {
        //     assign({
        //         selectedSquare: null
        //     })
        //     if(context.selectedSquareId) {
        //         send('HIDE', {
        //             to: (context => context.squares.find(s => s.id === context.selectedSquareId))
        //         }) 
        //     } 
        // },
        // removeIfMatched: (context, event) => {
            // const selectedSquare = context.squares.find(s => s.id === context.selectedSquareId)
            // const square = context.squares.find(s => s.id === event.squareId)
        //     send('SHOW', {
        //         to: square
        //     })  
        //     setTimeout(() => {
        //         if(square.value === selectedSquare.value) {
        //             assign({
        //                 disabledSquares: [...disabledSquares, selectedSquare.id, square.id]
        //             })
        //             send('DISABLE', {
        //                 to: square
        //             })
        //             send('DISABLE', {
        //                 to: selectedSquare
        //             })
        //         }
        //         else {
        //             send('HIDE', {
        //                 to: square
        //             })
        //         }
        //     }, 3000);

        // }
    }
})

export default gameMachine