import React, {useMemo} from 'react'
import {useActor} from '@xstate/react'
import {SquareContainer} from './styled/Square'

const Square = ({service}) => {
    const [current, send] = useActor(service)
    const onClick = () => {
        send({
            type: 'SELECT'
        })
    }
    return (
        <SquareContainer onClick={onClick}>
            {current.value === 'visible' && current.context.value}
        </SquareContainer>
    )
}
export default Square