import React, {useMemo} from 'react'
import {useService, useActor} from '@xstate/react'
import {SquareContainer} from './styled/Square'

const Square = ({service}) => {
    const [current, send] = useActor(service)
    return (
        <SquareContainer>
            {current.context.value}
        </SquareContainer>
    )
}
export default Square