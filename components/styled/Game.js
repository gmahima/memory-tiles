import styled from 'styled-components'
import tw from 'twin.macro'
import {motion} from 'framer-motion'
export const SquaresContainer = styled.div `
    display: grid;
    grid-template-columns: ${({order}) => `repeat(${order}, 1fr)`};
    grid-template-rows: ${({order}) => `repeat(${order}, 1fr)`};
    grid-gap: 0.5em;
    width: 16rem;
    height: 16rem;
    ${tw `p-4 sm:p-12 bg-gray-200 rounded`}
    @media (min-width: 768px) {
        width: 32rem;
        height: 32rem;
    }

`
export const Overlay = styled(motion.div) `
${tw `w-screen h-screen text-white fixed top-0 left-0 z-50 rounded flex items-center justify-center`}
`
export const SuccessMessage = styled(motion.div) `
${tw `p-1 sm:p-4 sm:w-56 font-bold text-white bg-green-500 rounded shadow-2xl flex items-center justify-center`}
`