import styled from 'styled-components'
import tw from 'twin.macro'

export const SquareContainer = styled.div `
    ${tw `
        rounded-lg 
        bg-gray-100
        flex items-center justify-center
        text-xs sm:text-sm
        sm:w-24 sm:h-24
        cursor-pointer
        text-gray-700

    `}
    ${props => {
        if(props.disabled) {
            return tw`bg-black bg-opacity-25`
        }
    }}
`