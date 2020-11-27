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
            // add transition to check - if no active squares in context, transition to game won
            entry: 'removeSquareSelection',
            on: {
                SELECT: {
                    target: 'selected',
                    actions: [
                        'select'
                    ]
                }
            }
        },
        selected: {

        }
    }
}, {
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
        compare: (context, event) => {
            console.log(context.selectedSquare, event.squareId)

        }
    }
})

export default gameMachine