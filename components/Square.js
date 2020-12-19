import React, {useMemo} from 'react'
import {useActor} from '@xstate/react'
import {SquareContainer, Image} from './styled/Square'

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
                {(current.value === 'visible' || current.value === 'showAnswer') && (
                    <Image src={`sprites/${current.context.value}.png`}></Image>
                )}
            </SquareContainer>
        ) : (
            <SquareContainer disabled></SquareContainer>
        )
    )
}
export default Square