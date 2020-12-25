import {Machine, assign, spawn, send} from 'xstate'
import createSquareMachine from './squareMachine'
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
// function getRandomDifferent(range, last = undefined) {
//     if (arr.length === 0) {
//         return;
//     } else if (arr.length === 1) {
//         return arr[0];
//     } else {
//         let num = 0;
//         do {
//         num = Math.floor(Math.random() * arr.length);
//         } while (arr[num] === last);
//         return arr[num];
//     }
// }
  
  // Used like so
//   var arr = [2, 11, 37, 42];
//   shuffle(arr);
//   console.log(arr);
// const squareData = [
//     {
//         id: '1',
//         value: '1'
//     },
//     {
//         id: '2',
//         value: '1'
//     },
//     {
//         id: '3',
//         value: '2'
//     },
//     {
//         id: '4',
//         value: '2'
//     },
//     {
//         id: '5',
//         value: '3'
//     },
//     {
//         id: '6',
//         value: '4'
//     },
//     {
//         id: '7',
//         value: '3'
//     },
//     {
//         id: '8',
//         value: '4'
//     },
//     {
//         id: '9',
//         value: '1'
//     },
//     {
//         id: '10',
//         value: '1'
//     },
//     {
//         id: '11',
//         value: '2'
//     },
//     {
//         id: '12',
//         value: '2'
//     },
//     {
//         id: '13',
//         value: '3'
//     },
//     {
//         id: '14',
//         value: '4'
//     },
//     {
//         id: '15',
//         value: '3'
//     },
//     {
//         id: '16',
//         value: '4'
//     }
// ]
const gameMachine = Machine({
    id: 'game',
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
    initial: 'noBoard',
    states: {
        noBoard: {
            on: {
                SET_UP_BOARD: {
                    target: 'start'
                }
            },
        },
        start: {
            // on: {
            //     START: {
            //         target: 'idle'
            //     }
            // },
            always: {
                target: 'idle'
            },
            entry: 'populate'
        },
        // peek: {
        //     always: {
        //         target: 'idle'
        //     },
        //     entry: 'showAllSquares',
        //     exit: 'hideAllSquares'
        // },
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
            console.log(!areDisabled && context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value && !(context.selectedSquare.id === context.squareToCompare.id))
            return (
                !(!areDisabled && context.selectedSquare.value!==null && context.squareToCompare.value!==null && context.selectedSquare.value === context.squareToCompare.value && !(context.selectedSquare.id === context.squareToCompare.id))
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
                // const squareIds = ['1', '2', '3', '4']
                const squareIds = []
                let i =1;
                while(i <= 4) {
                    let item = (Math.floor(Math.random() * (151 - 1 + 1)) + 1).toString()
                    if(squareIds.length === 0) {
                        squareIds.push(item)
                        i++
                    }
                    else if(item !== squareIds[squareIds.length - 1]) {
                        squareIds.push(item)
                        i++
                    }
                }
                console.log(squareIds)
                let squareData = []
                for(let i=0; i<4; i++) {
                    for(let j=0; j<4; j++) {
                        squareData.push({
                            id: (squareData.length+1).toString(),
                            value: (squareIds[i]).toString()
                        })
                    }
                }
                console.log(squareData)
                squareData = shuffle(squareData)
                const squares = squareData.map(s => {
                    const square = spawn(createSquareMachine(s), s.id)
                    return (
                        square
                    )
                })
                return squares
            }
        }),
        // showAllSquares: (context) => {
        //     context.squares.forEach(c => c.send("SHOW"))
        // },
        // hideAllSquares: (context) => {
        //     setTimeout(() => {
        //         context.squares.forEach(c => c.send("HIDE"))
        //     }, 3000)
        // },
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