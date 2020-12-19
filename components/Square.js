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
                <SquareContainer onClick={onClick}
                animate={{ rotate: 180 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                        <Image src={`sprites/${current.context.value}.png`}></Image>
                </SquareContainer>
            ) : (
                <SquareContainer onClick={onClick} hidden 
                animate={{ rotate: 90 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                        {/* <Image src={`sprites/${current.context.value}.png`}></Image> */}
                </SquareContainer>
            )
        ) : (
            <SquareContainer disabled 
            animate={{ rotate: 90 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            ></SquareContainer>
        )}
        </AnimatePresence>
    //     <SquareContainer

    //     animate={{ rotate: 360 }}
    // transition={{ duration: 2 }}
    //     ></SquareContainer>
    )
}
export default Square