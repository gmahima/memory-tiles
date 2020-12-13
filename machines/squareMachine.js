import {Machine, assign,send} from 'xstate'

export default function createSquareMachine (squareData) {
    return Machine({
        id: 'square',
        initial: 'hidden',
        context: {
            ...squareData
        },
        states: {
            hidden: {
                on: {
                    SHOW: {
                        target: 'visible'
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
                    }
                }
            },
            disabled: {
                type: 'final'
            }
        }
    })
}