import styled from 'styled-components'
import tw from 'twin.macro'
import {motion} from 'framer-motion'
export const SquareContainer = styled(motion.div) `
    ${tw `
        rounded-lg 
        bg-white
        flex items-center justify-center
        text-xs sm:text-sm
        h-12 w-12 sm:w-24 sm:h-24
        cursor-pointer
        text-gray-700
        shadow

    `}
    ${props => {
        if(props.disabled) {
            return tw`bg-gray-300 shadow-none bg-opacity-25`
        }
        if(props.hidden) {
            return tw`bg-red-400`
        }
    }}
`
export const Image = styled.img `
${tw `w-full`}
`