import React, {useMemo} from 'react'
import {useService, useActor} from '@xstate/react'
import {SquareContainer} from './styled/Square'

const Square = ({service, handleClick}) => {
    const [current, send] = useActor(service)
    console.log(current)
    const onClick = () => {
        if(current.value === 'visible') {
            send('HIDE')
        }
        else if (current.value === 'hidden') {
            send('SHOW')
        }
    }
    return (
        <SquareContainer onClick={onClick}>
            {current.value === 'visible' && current.context.value}
        </SquareContainer>
    )
}
export default Square