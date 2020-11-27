import styled from 'styled-components'
import tw from 'twin.macro'

export const AppContainer = styled.div`
${tw `
    flex flex-col
    justify-center items-center
    bg-gray-800
    min-h-screen
    
`}
`
export const GameContainer = styled.div`
${tw `
    text-xl bg-gray-900 text-center rounded-lg
    p-12
`}
`