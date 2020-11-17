import React from "react";
import { NavLink } from 'react-router-dom';
import {Styled404} from "../styles/cards"
import Four0Four from '../assets/img/404_2.png'

export const NotFound = (props) => {
  return (
    <Styled404>
            <div id="content">
                <p>Whoops!
               </p>
                <p>
                Sorry the page you are looking for doesn't exist.
                </p>
                <button>
                <NavLink to="/">
      Go Home
    </NavLink>
                </button>
            </div>

            <div id="image">
           <img src={Four0Four} alt="Logo"/>
            </div>
        </Styled404>
  );
};
