import React from 'react'
import {SquareContainer} from './styled/Square'

const Square = ({s}) => {
    return (
        <SquareContainer>
            {s.value}
        </SquareContainer>
    )
}
export default Square