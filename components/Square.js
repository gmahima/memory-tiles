import React, {useMemo} from 'react'
import {useActor} from '@xstate/react'
import {SquareContainer, Image} from './styled/Square'
import {AnimatePresence, motion} from 'framer-motion'
const Square = ({service, x, y}) => {
    const [current, send] = useActor(service)
    const onClick = () => {
        send({
            type: 'SELECT'
        })
    }
    return (
        <AnimatePresence exitBeforeEnter={true}>
            <motion.div onClick={onClick}
                initial={{opacity: 0}}
                animate={{opacity: 1, rotate: 270}}
                exit={{opacity: 0}}
            >
                {console.log("+++++++++++++++++++ " + current.value + " ++++++++++++++++++++")}
                {current.value === 'disabled' && (
                    <SquareContainer disabled animate={{opacity: 1, x: 0, rotate: 90}}></SquareContainer>
                )}
                {current.value === 'showAnswer' && (
                    <SquareContainer
                    animate={{opacity: 1, x: 0, rotate: 90}}
                    >
                        <Image src={`sprites/${current.context.value}.png`}></Image>
                    </SquareContainer>
                )}
                {current.value === 'hidden' && (
                    <SquareContainer animate={{opacity: 1, x: 0, rotate: 90}}
                    ></SquareContainer>
                )}
                {current.value === 'visible' && (
                    <SquareContainer visible animate={{opacity: 1, x: 0, rotate: 90}}>
                        <Image src={`sprites/${current.context.value}.png`}></Image>
                    </SquareContainer>
                )}
            </motion.div>
        </AnimatePresence>
    //     <SquareContainer

    //     animate={{ rotate: 360 }}
    // transition={{ duration: 2 }}
    //     ></SquareContainer>
    )
}
export default Square