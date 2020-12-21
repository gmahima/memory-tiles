import React, {useMemo, useState} from 'react'
import {useActor} from '@xstate/react'
import {Visible, Hidden, Disabled, StyledImage} from './styled/Square'
import Image from 'next/image'
import {AnimatePresence, motion} from 'framer-motion'
import tw from 'twin.macro'

const toastVariants= {
    initial: {x: "-50%", opacity: 0, scale: 0},
    animate: {x: "0%", opacity: 1, scale: 1},
    exit: {x: "50%", opacity: 0, scale: 0}
  }
  const spanVariants= {
    initial: {color: '#ff0000'},
    animate: {color: '#00ff00'},
    exit: {color: '#0000ff'}
  }
  const blueSpanVariants= {
    initial: {color: '#00ff00'},
    animate: {color: '#0000ff'},
    exit: {color: '#ff0000'}
  }
  // motion not working without seperate scs ? some thing can be improved? 
  function SquareContainer ({value, handleClick, children}) {
    return (
        <AnimatePresence>
      {/* {!blue ? (
        <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      >
        <motion.span variants={blueSpanVariants}>blue toast</motion.span>
      </motion.div>
      ): (
        <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      >
        <motion.span variants={spanVariants}>toast</motion.span>
      </motion.div>
      )} */}
      {console.log(value)}
      {(value === 'showAnswer' || value==='visible') && (
        <Visible value={value}
        onClick={handleClick}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        >
          {children}
          </Visible>
      )}
      {value === 'hidden' && (
        <Hidden value={value}
        onClick={handleClick}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        >
        </Hidden>
      )}
      {value === 'disabled' && (
        <Disabled value={value}
        onClick={handleClick}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        >
        </Disabled>
      )}
      </AnimatePresence>
    )
      }
  
const Square = ({service, x, y}) => {
    const [current, send] = useActor(service)
    const [showToast, setShowToast] = useState(false)
    const onClick = () => {
      console.log("hi")
        send({
            type: 'SELECT'
        })
    }
    return (
          <SquareContainer value={current.value} handleClick={onClick}>
            {(current.value === 'showAnswer' || current.value === 'visible') && <StyledImage animate={{}}layout='fill' src={`/sprites/${current.context.value}.png`} alt={`${current.context.value}`}></StyledImage>}
          </SquareContainer>

    //     <SquareContainer

    //     animate={{ rotate: 360 }}
    // transition={{ duration: 2 }}
    //     ></SquareContainer>
    )
}
export default Square