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
        h-12 w-12 sm:w-24 sm:h-24
        cursor-pointer
        text-gray-700
        shadow

    `}
`
export const StyledImage = styled(motion.img) `
${tw `w-full`}
`

export const Hidden = styled(Visible) `
${tw `bg-white shadow`}
`
export const Disabled = styled(motion.div) `
    ${tw `
    bg-gray-200
    `}
`

