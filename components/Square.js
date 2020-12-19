import React, {useMemo} from 'react'
import {useActor} from '@xstate/react'
import {SquareContainer, Image} from './styled/Square'
import {AnimatePresence} from 'framer-motion'
const Square = ({service, x, y}) => {
    const [current, send] = useActor(service)
    const onClick = () => {
        send({
            type: 'SELECT'
        })
    }
    return (
        <AnimatePresence>
{        current.value !== 'disabled' ? ( 
            current.value === 'visible' || current.value === 'showAnswer' ? (
                <SquareContainer onClick={onClick} initial={{y:-10}} animate={{y:0}}>
                        <Image src={`sprites/${current.context.value}.png`}></Image>
                </SquareContainer>
            ) : (
                <SquareContainer onClick={onClick} hidden >
                        {/* <Image src={`sprites/${current.context.value}.png`}></Image> */}
                </SquareContainer>
            )
        ) : (
            <SquareContainer disabled ></SquareContainer>
        )}
        </AnimatePresence>
    //     <SquareContainer

    //     animate={{ rotate: 360 }}
    // transition={{ duration: 2 }}
    //     ></SquareContainer>
    )
}
export default Square