import {Machine, assign, spawn, send} from 'xstate'
import createSquareMachine from './squareMachine'
const squareData = [
    {
        id: '1',
        value: '1'
    },
    {
        id: '2',
        value: '1'
    },
    {
        id: '3',
        value: '2'
    },
    {
        id: '4',
        value: '2'
    },
    {
        id: '5',
        value: '3'
    },
    {
        id: '6',
        value: '4'
    },
    {
        id: '7',
        value: '3'
    },
    {
        id: '8',
        value: '4'
    },
    {
        id: '9',
        value: '1'
    },
    {
        id: '10',
        value: '1'
    },
    {
        id: '11',
        value: '2'
    },
    {
        id: '12',
        value: '2'
    },
    {
        id: '13',
        value: '3'
    },
    {
        id: '14',
        value: '4'
    },
    {
        id: '15',
        value: '3'
    },
    {
        id: '16',
        value: '4'
    }
]
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
            always: {
                target: 'idle'
            },
            entry: 'populate'
        },
        idle: {
            entry: 'removeSelectedSquares',
            always: {
                target: 'won',
                cond: "didWin"
            },
            on: {
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
                    target: 'compare',
                    actions: [
                        'selectSquareToCompare'
                    ]
                },
                CANCEL_SELECTION: {
                    target: 'idle'
                }
            }
        },
        compare: {
            entry: (context) => {console.log("in compare", context)},
            always: [
                {
                    target: 'noMatch',
                    cond: 'noMatchFound'
                },
                {
                    target: 'match'
                }
                
            ]         
        },
        dummy: {
            entry: (context) => {console.log("in dummy", context)}
        },
        match: {
            entry: [
                send('DISABLE', {
                    
                    to: (context => {console.log(context.selectedSquare); return context.squares.find(s => s.id === context.selectedSquare.id)})
                }),
                send('DISABLE', {
                    to: (context => {console.log(context.squareToCompare); return context.squares.find(s => s.id === context.squareToCompare.id)})
                }),
                'disableMatchedSquares'
            ],
            always: 'idle'
        },
        noMatch: {
            entry: [
                send('HIDE', {
                    
                    to: (context => {console.log(context.selectedSquare); return context.squares.find(s => s.id === context.selectedSquare.id)})
                }),
                send('HIDE', {
                    to: (context => {console.log(context.squareToCompare); return context.squares.find(s => s.id === context.squareToCompare.id)})
                })
            ],
            always: 'idle'
        },
        won: {
            on: {
                RESET: {
                    target: 'start',
                    actions: [
                        assign({
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
                        })
                    ]
                }
            }
        }
    }
}, {
    guards: {
        didWin: (context) => {
            console.log(context.disabledSquares)
            console.log("CHECKING FOR WIN")
            return (context.disabledSquares.length === context.squares.length)
        },
        noMatchFound: (context) => {
            
            const areDisabled = context.disabledSquares.find(id => (id === context.selectedSquare.id || id === context.squareToCompare.id))
            console.log(!areDisabled && context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value)
            return (
                !(!areDisabled && context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value)
            )
        },
        matchFound: (context) => {
            
            const areDisabled = context.disabledSquares.find(id => (id === context.selectedSquare.id || id === context.squareToCompare.id))
            console.log(!areDisabled && context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value)
            return (
                !areDisabled && context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value
            )
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
        removeSelectedSquares: assign({
            selectedSquare: {
                id: null,
                value: null
            },
            squareToCompare: {
                id: null,
                value: null
            }
        }),
        selectSquare: assign({
            selectedSquare: (context, event) => {
                console.log(context);
                return {
                    id: event.squareId,
                    value: event.squareValue
                }
            }
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
                return ({
                    id: event.squareId,
                    value: event.squareValue
                })
            }
        }),
        disableMatchedSquares: assign({
            disabledSquares: (context, event) => {
                let d = [...context.disabledSquares]
                if(!d.find(i => (i===context.selectedSquare.id || i === context.squareToCompare.id))) {
                    d.push(context.selectedSquare.id)
                    d.push(context.squareToCompare.id)
                }
                return d;
            }
        })
    }
})

export default gameMachine