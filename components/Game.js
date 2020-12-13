import React from 'react'
import Square from './Square'
import {SquaresContainer} from './styled/Game'
import gameMachine from '../machines/gameMachine'
import { useMachine } from '@xstate/react'
const Game = () => {
    const [current, send] = useMachine(gameMachine)
    const {squares} = current.context
    return (
        <SquaresContainer order={2}>
            {squares.map(s => {
                return (
                    <Square key={s.id} s={s} handleClick={handleClick}/>
                )
            })}
        </SquaresContainer>
    )
}
export default Game