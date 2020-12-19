import {Machine, assign,send, sendParent} from 'xstate'

export default function createSquareMachine (squareData) {
    return Machine({
        id: 'square',
        initial: 'showAnswer',
        context: {
            ...squareData
        },
        states: {
            showAnswer: {
                after: {
                    700: 'hidden'
                }
            },
            hidden: {
                on: {
                    SHOW: {
                        target: 'visible'
                    }, // try not to use -> use select
                    SELECT: {
                        target: 'visible',
                        actions: sendParent((context) => {
                            return (
                                {type: "SELECT_SQUARE", squareId: context.id, squareValue: context.value}
                            )
                        }, {
                            delay: 300})

                    }
                }
            },
            visible: {
                on: {
                    HIDE: {
                        target: 'hidden'
                    },
                    DISABLE: {
                        target: 'disabled'
                    },
                    SELECT: {
                        target: 'hidden',
                        actions: sendParent((context) => {
                            return {
                                type: "CANCEL_SELECTION"
                            }
                        })
                    }
                }
            },
            disabled: {
                type: 'final'
            }
        }
    })
}