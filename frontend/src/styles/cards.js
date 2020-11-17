import styled from "styled-components";
import tw from "twin.macro";


export const StyledLanding = styled.main.attrs({
    className: "bg-red-100",
  })`
    & {
      ${tw`bg-white px-6 py-4 sm:flex sm:justify-between sm:p-16`}
      div#content{
          p:nth-child(1){
              ${tw`font-mono text-5xl text-gray-900 uppercase`}
          }
       p:nth-child(2){
            ${tw` text-lg text-black`}
        }
        button{
            a{
                ${tw` no-underline text-white`}
            }
            ${tw`bg-gray-900 hover:bg-gray-200 hover:text-gray-900 rounded-md cursor-pointer text-white px-3 py-3 uppercase `}
        }
    }
    div#image{
        ${tw` hidden sm:block mb-12 sm:m-6`}
        img{
            ${tw`mt-32 h-32  sm:h-32 xl:h-64 object-cover `}
        }
    }
}
  `;
  export const Styled404 = styled.main.attrs({
    className: "",
  })`
    & {
      ${tw`bg-white px-6 py-4 sm:flex sm:justify-between sm:p-16`}
      div#content{
          p:nth-child(1){
              ${tw`font-mono text-5xl text-gray-900 uppercase`}
          }
        button{
            a{
                ${tw` no-underline text-white`}
            }
            ${tw`bg-gray-900 hover:bg-gray-200 hover:text-gray-900 rounded-md cursor-pointer text-white px-3 py-3 uppercase `}
        }
    }
    div#image{
        ${tw` hidden sm:block mb-12 sm:m-6`}
        img{
            ${tw`mt-32 h-32  sm:h-32 xl:h-64 object-cover `}
        }
    }
}
  `;