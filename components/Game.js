import React, { useEffect } from 'react'
import Square from './Square'
import {SquaresContainer, Overlay, SuccessMessage} from './styled/Game'
import gameMachine from '../machines/gameMachine'
import { useMachine } from '@xstate/react'
import {motion, AnimatePresence} from 'framer-motion'

const Game = () => {
    const [current, send] = useMachine(gameMachine)
    const {squares} = current.context
    const n = 4;
    useEffect(() => {
        console.log(current.value)
        send("SET_UP_BOARD")
    }, [])
    return (
        <>
        <AnimatePresence>
            {current.value==='won' && (
                <Overlay
                initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                >
                    <SuccessMessage
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 50}}
                        exit={{opacity: 0, height: 0}}
                        onClick={() => send("RESET")}
                    >You win! Replay ?</SuccessMessage>
                </Overlay>
            )}
        </AnimatePresence>
        {squares && (squares.length> 0) && (
            <SquaresContainer order={n}>
                {squares.map((s, i) => {
                    return (
                        <Square key={s.id} service={s}/>
                    )
                })}
            </SquaresContainer>
        )}
        </>
    )
}
export default Game