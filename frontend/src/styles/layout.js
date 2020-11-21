import styled from "styled-components";
import tw from "twin.macro";


export const StyledLanding = styled.main.attrs({
    className: "",
  })`
    & {
      ${tw`bg-white px-6 py-4 sm:flex sm:justify-between sm:p-16`}
      div#content{
          p:nth-child(1){
              ${tw`text-5xl text-gray-900 font-bold uppercase`}
          }
       p:nth-child(2){
            ${tw` text-lg text-black`}
        }
        button{
            a{
                ${tw`  no-underline `}
            }
            ${tw`bg-gray-900 mt-4 text-white hover:text-black hover:bg-gray-300   rounded-md cursor-pointer px-3 py-3 uppercase `}
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
}
  `;

  export const StyledRegister = styled.main.attrs({
    className: "",
  })`
    & {
      ${tw`bg-white  px-6 py-4 flex flex-wrap items-center sm:justify-between sm:p-16`}
}
  `;

  export const StyledLogin = styled.main.attrs({
    className: "",
  })`
    & {
      ${tw`bg-white  px-6 py-4 flex flex-wrap items-center sm:justify-between sm:p-16`}
}
  `;

  export const SingleOrder = styled.main.attrs({
    className: "",
  })`
    & {
}
  `;

  export const StyledProduct = styled.main.attrs({
    className: "",
  })`
    & {
        .form-tick:checked:after {
            content: ' ✔';
          }
}
  `;

  export const SingleProduct = styled.main.attrs({
    className: "",
})`
  & {
     #progressbar{

        li {
            list-style-type: none;
            font-size: 15px;
            width: 25%;
            float: left;
            position: relative;
            font-weight: 400;
        }
         li.active:before,li.active:after {
            background: rgba(17, 24, 39,1);
        }
         li:before {
            content: "1";
            text-align:center;
            width: 50px;
            height: 50px;
            line-height: 45px;
            display: block;
            font-size: 20px;
            color: #ffffff;
            background: lightgray;
            border-radius: 50%;
            margin: 0 auto 10px auto;
            padding: 2px;
         }
         li:nth-child(1):before {
          content: "1";
         }
         li:nth-child(2):before {
          content: "2";
         }
         li:nth-child(3):before {
          content: "3";
         }
        li:after {
            content: '';
            width: 100%;
            height: 2px;
            background: lightgray;
            position: absolute;
            left: 0;
            top: 25px;
            z-index: -1;
          }
     }
}
`;