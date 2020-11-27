import React from 'react'
import Square from './Square'
import {SquaresContainer} from './styled/Game'
const squares = [
    {
        id: '1',
        content: 'asdf'
    },
    {
        id: '2',
        content: 'asdf'
    },
    {
        id: '3',
        content: 'asdf'
    },
    {
        id: '4',
        content: 'asdf'
    }
]
const Game = () => {
    return (
        <SquaresContainer order={2}>
            {squares.map(s => {
                return (
                    <Square key={s.id} s={s} />
                )
            })}
        </SquaresContainer>
    )
}
export default Game