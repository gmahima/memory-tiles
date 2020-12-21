import Head from 'next/head'
import styled, {css} from 'styled-components'
import tw from 'twin.macro'
import {AppContainer, GameContainer} from '../components/styled/index'
import Game from '../components/Game'
import {motion, AnimatePresence} from 'framer-motion'
import React, {useState} from 'react'
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
    !blue ? (
      <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded absolute bottom-0 right-0`}
    variants={toastVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    >
      <motion.span variants={blueSpanVariants}>blue toast</motion.span>
    </motion.div>
    ): (
      <motion.div css={tw`bg-gray-900 text-white py-2 px-4 bg-opacity-75 m-2 rounded absolute bottom-0 right-0`}
    variants={toastVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    >
      <motion.span variants={spanVariants}>toast</motion.span>
    </motion.div>
    )
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
export default function Home() {
  const [showToast, setShowToast] = useState(false)
  return (
    <AppContainer>
      <GameContainer>
        <Game />
      </GameContainer>
    </AppContainer>
  )
}
