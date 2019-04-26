import React from 'react';
import './footer.css';

const Footer = () => {
    return(
        <div className="footer-main">
            <div className="footer-content">
                <div className="site-links">
                    <a className='slate-logo' href="/">slate <span>©2019</span></a>
                    <a className='footer-link' href="/shop">SHOP</a>
                    <a className='footer-link' href="/hire/architects">HIRE</a>
                </div>

            </div>
        </div>
    )
}

export default Footer;