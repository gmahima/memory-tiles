import React from 'react'
import {SquareContainer} from './styled/Square'

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
const Square = ({s}) => {
    return (
        <SquareContainer>
            {s.content}
        </SquareContainer>
    )
}
export default Square