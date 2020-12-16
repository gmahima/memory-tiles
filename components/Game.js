import React from 'react'
import Square from './Square'
import {SquaresContainer} from './styled/Game'
import gameMachine from '../machines/gameMachine'
import { useMachine } from '@xstate/react'
const Game = () => {
    const [current, send] = useMachine(gameMachine)
    const {squares} = current.context
    const n = 4;
    return (
        <SquaresContainer order={n}>
            {squares && squares.map((s, i) => {
                return (
                    <Square key={s.id} service={s}/>
                )
            })}
        </SquaresContainer>
    )
}
export default Game