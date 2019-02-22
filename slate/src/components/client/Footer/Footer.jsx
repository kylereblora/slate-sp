import React from 'react';
import './footer.css';

const Footer = () => {
    return(
        <div className="footer-main">
            <div className ="about">
                <h3>ABOUT</h3>
                <ul>
                    <li><a href="#">Contact us</a></li>
                </ul>
            </div>

            <div className="shop">
                <h3>SHOP</h3>
                <ul>
                    <li><a href="#">Bath</a></li>
                    <li><a href="#">Curtains and Blinds</a></li>
                    <li><a href="#">Home Interior</a></li>
                    <li><a href="#">Lightings and Fans</a></li>
                    <li><a href="#">Walls and Flooring</a></li>
                </ul>
            </div>

            <div className="hire">
                <h3>HIRE</h3>
                <ul>                    
                    <li><a href="/hire/architect">Architects</a></li>
                    <li><a href="/hire/interior-designer">Interior Designers</a></li>
                </ul>
            </div>

        </div>
    )
}

export default Footer;