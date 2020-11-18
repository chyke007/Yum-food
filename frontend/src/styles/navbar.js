import styled from "styled-components";
import tw from "twin.macro";

export const StyledNavbar = styled.main.attrs({
  className: "bg-red-100",
})`
  & {
    ${tw`bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3`}
    div{
        ${tw `flex items-center justify-between px-4 py-3 sm:p-0`}
        span#button{
            ${tw `sm:hidden`}
            button{
                ${tw`block text-gray-500 bg-transparent border-none hover:text-white focus:text-white focus:outline-none`}
                svg{
                    ${tw `h-6 w-6 fill-current`}
                }
            }
        }
        img {
            ${tw `h-8`}
        }
    }
    div#links{
        ${tw `block sm:flex px-2 pt-2 pb-3`}
        .active{
          ${tw `bg-gray-800`}
        }
        &.hidden{
            ${tw `hidden sm:flex`}
        }
      a{
        ${tw `mt-1 sm:ml-1 block no-underline px-2 py-1 text-white font-semibold rounded hover:bg-gray-800`}
       }
    }
  }
`;
