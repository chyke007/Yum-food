import React from "react";
import {StyledLanding} from "../styles/cards"
import landing from '../assets/img/landing.jpg'

export const Landing = (props) => {
  return (
    <StyledLanding>
            <div id="content">
                <p>Safe food
                <br/>
                Delivery</p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus vel tellus sit amet lacinia. Nulla efficitur vulputate diam vel condimentum. Sed eu sapien quis quam faucibus facilisis. Morbi sagittis libero semper, sollicitudin dolor vel, semper velit. Aenean tempus felis a placerat tempus. Duis sodales, felis vel commodo efficitur, dui lorem mollis quam, ut scelerisque turpis eros eget ligula. Quisque vitae mollis turpis. Ut in nisi sed velit ultricies rutrum. Integer consequat feugiat urna vitae placerat.
                </p>
                <button>Order Now</button>
            </div>

            <div id="image">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus vel tellus sit amet lacinia. Nulla efficitur vulputate diam vel condimentum. Sed eu sapien quis quam faucibus facilisis. Morbi sagittis libero semper, sollicitudin dolor vel, semper velit. Aenean tempus felis a placerat tempus. Duis sodales, felis vel commodo efficitur, dui lorem mollis quam, ut scelerisque turpis eros eget ligula. Quisque vitae mollis turpis. Ut in nisi sed velit ultricies rutrum. Integer consequat feugiat urna vitae placerat.
                </p>
            <img src={landing} alt="Logo"/>
            </div>
        </StyledLanding>
  );
};
