import React, {useMemo, useState} from 'react'
import {useActor} from '@xstate/react'
import {SquareContainer} from './styled/Square'
import Image from 'next/image'
import {AnimatePresence, motion} from 'framer-motion'
import tw from 'twin.macro'

const toastVariants= {
    initial: {y: "200%"},
    animate: {y: "0%"},
    exit: {y: "200%"}
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
  function Toast ({value, handleClick}) {
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
        <motion.div css={tw`bg-red-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded`}
        onClick={handleClick}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        >
          <motion.span variants={blueSpanVariants}>blue toast</motion.span>
        </motion.div>
      )}
      {value === 'hidden' && (
        <motion.div css={tw`bg-green-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded`}
        onClick={handleClick}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        >
          <motion.span variants={blueSpanVariants}>blue toast</motion.span>
        </motion.div>
      )}
      {value === 'disabled' && (
        <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded`}
        onClick={handleClick}
        variants={toastVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        >
          <motion.span variants={blueSpanVariants}>blue toast</motion.span>
        </motion.div>
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
          <Toast value={current.value} handleClick={onClick}></Toast>

    //     <SquareContainer

    //     animate={{ rotate: 360 }}
    // transition={{ duration: 2 }}
    //     ></SquareContainer>
    )
}
export default Square