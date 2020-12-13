import React, {useMemo} from 'react'
import {useService} from '@xstate/react'
import {SquareContainer} from './styled/Square'

const Square = ({s}) => {
    const [current, send] = useService(s)
    return (
        <SquareContainer>
            {current.context.value}
        </SquareContainer>
    )
}
export default Square