import React from 'react'
import {SquareContainer} from './styled/Square'

const Square = ({s, handleClick}) => {
    return (
        <SquareContainer onClick={() => {handleClick(s.id)}}>
            {s.content}
        </SquareContainer>
    )
}
export default Square