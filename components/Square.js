import React, {useMemo} from 'react'
import {useActor} from '@xstate/react'
import {SquareContainer} from './styled/Square'

const Square = ({service, x, y}) => {
    const [current, send] = useActor(service)
    const onClick = () => {
        send({
            type: 'SELECT'
        })
    }
    return (
        current.value !== 'disabled' ? ( 
            <SquareContainer onClick={onClick}>
                {current.value === 'visible' && current.context.value}
            </SquareContainer>
        ) : (
            <SquareContainer disabled></SquareContainer>
        )
    )
}
export default Square