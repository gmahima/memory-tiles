import Head from 'next/head'
import styled, {css} from 'styled-components'
import tw from 'twin.macro'
import {AppContainer, GameContainer} from '../components/styled/index'
import Game from '../components/Game'

export default function Home() {
  return (
    <AppContainer>
      <GameContainer>
        <Game />
      </GameContainer>
    </AppContainer>
  )
}
