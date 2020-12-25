import styled from 'styled-components'
import tw from 'twin.macro'
import {motion} from 'framer-motion'
import Image from 'next/image'
export const Visible = styled(motion.div) `
    ${tw `
        rounded-lg 
        bg-white
        flex items-center justify-center
        text-xs sm:text-sm
        cursor-pointer
        text-gray-700
        shadow
        w-full h-full

    `}
    ${(props) => {
        if(props.value === 'showAnswer') {
            return tw`cursor-default`
        }
    }}
`
export const StyledImage = styled(motion.img) `
${tw `w-full`}
`

export const Hidden = styled(Visible) `
${tw `bg-white shadow`}
`
export const Disabled = styled(Visible) `
    ${tw ` 
    bg-gray-200 cursor-default shadow-none
    `}
`

