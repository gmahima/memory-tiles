import {Machine, assign, spawn, send} from 'xstate'
import createSquareMachine from './SquareMachine'
const squareData = [
    {
        id: '1',
        value: 'pikachu'
    },
    {
        id: '2',
        value: 'pikachu'
    },
    {
        id: '3',
        value: 'jigglypuff'
    },
    {
        id: '4',
        value: 'jigglypuff'
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
        squareToCompare: {
            id: null,
            value: null
        },
        disabledSquares: []
    },
    states: {
        start: {
            entry: () => {console.log('start called')},
            always: {
                target: 'idle'
            },
            entry: 'populate'
        },
        idle: {
            entry: (context) => {console.log(context.squares)},
            always: [
                {
                    target: 'won',
                    cond: "didWin"
                },
                {
                    target: 'match',
                    cond: 'matchFound'
                }
            ],
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
                        'selectSquareToCompare'
                    ]
                }
            }
        },
        match: {
            entry: [
                send('DISABLE', {
                    to: (context => context.squares.find(s => s.id === context.selectedSquare.id))
                }),
                send('DISABLE', {
                    to: (context => context.squares.find(s => s.id === context.squareToCompare.id))
                })
            ],
            exit: [
                'disableMatchedSquares'
            ],
            always: 'idle'
        },
        won: {}
    }
}, {
    guards: {
        matchFound: (context) => {
            console.log(context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value,context.selectedSquare.value, context.squareToCompare.value)
            return (
                context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value
            )
        },
        didWin: (context) => {
            console.log(context.disabledSquares)
            // console.log(context, event)
            return (context.disabledSquares.length === context.squares.length)
        }
    },
    actions: {
        populate: assign({
            squares: (context, event) => {
                const squares = squareData.map(s => {
                    const square = spawn(createSquareMachine(s), s.id)
                    return (
                        square
                    )
                })
                return squares
            }
        }),
        selectSquare: assign({
            selectedSquare: (context, event) => {
                console.log(context);
                return {
                    id: event.squareId,
                    value: event.squareValue
                }
            } // pass data too
        }),
        selectSquareToCompare: assign({
            squareToCompare: (context, event) => {
                console.log(context);
                return ({
                    id: context.selectedSquare.id,
                    value: context.selectedSquare.value
                })
            },
            selectedSquare: (context, event) => {
                console.log(context);
                return ({
                    id: event.squareId,
                    value: event.squareValue
                })
            }
        }),
        disableMatchedSquares: assign({
            disabledSquares: (context, event) => {
                let d = [...context.disabledSquares]
                d.push(context.selectedSquare.id, context.squareToCompare.id)
                return d;
            }
        }),
        removeSelectedSquares: assign({
            selectedSquare: {
                id: null,
                value: null
            },
            squareToCompare: {
                id: null,
                value: null
            }
        })
        // disableIfMatched: assign({
        //     disabledSquares: (context, event) => {
        //         console.log(context, event)
        //         let d = [...context.disabledSquares]
        //         const selectedSquare = context.selectedSquare
        //         const square = {id: event.squareId, value: event.squareValue}
        //         console.log(square.value, selectedSquare.value) // value is undefined // maybe store selected square's value here 
        //         if(square.value === selectedSquare.value) {
        //             d.push(selectedSquare.id, square.id)
        //         }
        //         return d;
                
        //     }
        // }),

            
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