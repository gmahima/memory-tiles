import styled from 'styled-components'
import tw from 'twin.macro'

export const SquaresContainer = styled.div `
    display: grid;
    grid-template-columns: ${({order}) => `repeat(${order}, 1fr)`};
    grid-template-rows: ${({order}) => `repeat(${order}, 1fr)`};
    grid-gap: 0.5em;
`