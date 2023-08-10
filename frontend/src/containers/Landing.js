import React from "react";
import { NavLink } from 'react-router-dom';
import {StyledLanding} from "../styles/layout"
import landing from '../assets/img/landing.jpg'
import ReactGA from 'react-ga';

const Landing = (props) => {
  process.env.NODE_ENV === 'production' && ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <StyledLanding>
            <div id="content" className="sm:w-1/2">
                <p>Yummy Delicacies </p>
                <p>
                Welcome to Yum Food 2.0 - Your ultimate destination for food ordering! Discover a vast selection of cuisines from around the world, all at your fingertips. Our user-friendly platform offers seamless ordering with quick and reliable delivery right to your doorstep. Enjoy exclusive offers and easy payment options for a hassle-free experience. Our dedicated customer support team is always ready to assist you. Join Yum Food today and indulge in a delightful culinary journey. Treat yourself to a world of flavors and convenience, all in one place. Bon appétit!
                </p>
                <button>
                <NavLink to="/product"> Order Now</NavLink>
                </button>
            </div>

            <div id="image"  className="sm:w-1/2">
            <p>
                Quisque vitae mollis turpis. Ut in nisi sed velit ultricies rutrum. Integer consequat feugiat urna vitae placerat.
                </p>
            <img src={landing} alt="Logo"/>
            </div>
        </StyledLanding>
  );
};
export default Landing