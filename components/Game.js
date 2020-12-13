import React from 'react'
import Square from './Square'
import {SquaresContainer} from './styled/Game'
import gameMachine from '../machines/gameMachine'
import { useMachine } from '@xstate/react'
const Game = () => {
    const [current, send] = useMachine(gameMachine)
    const {squares} = current.context
    const handleClick = (id) => {
        send('SELECT', {
            id: id
        })
    }
    return (
        <SquaresContainer order={2}>
            {squares && squares.map(s => {
                return (
                    <Square key={s.id} service={s} handleClick={handleClick}/>
                )
            })}
        </SquaresContainer>
    )
}
export default Game