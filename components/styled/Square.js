import styled from 'styled-components'
import tw from 'twin.macro'

export const SquareContainer = styled.div `
    ${tw `
        rounded-lg 
        bg-gray-100
        flex items-center justify-center
        w-32 h-32
        cursor-pointer
        text-gray-700

    `}
    ${props => {
        if(props.disabled) {
            return tw`bg-black bg-opacity-25`
        }
    }}
`