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
  function Toast ({blue}) {
    return (
        <AnimatePresence>
      {!blue ? (
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
      )}
      </AnimatePresence>
    )
    if(blue) {
      return (
        <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded absolute bottom-0 right-0`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      >
        <motion.span variants={spanVariants}>toast</motion.span>
      </motion.div>
      )
    }
    else {
      return (
        <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded absolute bottom-0 right-0`}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      >
        <motion.span variants={blueSpanVariants}>blue toast</motion.span>
      </motion.div>
      )
    }
  }
  
const Square = ({service, x, y}) => {
    const [current, send] = useActor(service)
    const [showToast, setShowToast] = useState(false)
    const onClick = () => {
        send({
            type: 'SELECT'
        })
    }
    return (
        <>
        <button onClick={() => {setShowToast(!showToast)}} css={tw`m-2 p-1 bg-green-500 text-white rounded`}>show toast</button>
      <Toast blue={current.value==="showAnswer"}></Toast>
      </>
    //     <SquareContainer

    //     animate={{ rotate: 360 }}
    // transition={{ duration: 2 }}
    //     ></SquareContainer>
    )
}
export default Square