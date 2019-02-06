import React from 'react';
import { NavLink } from 'react-router-dom';
import './signedoutlinks.css';

const SignedOutLinks = () => {
    return(
        <div>
            <div className="navbar-items">
                <ul>
                    <li><NavLink 
                        to="/shop"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Shop</NavLink></li> 
                    <li><NavLink 
                        to="/hire"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Hire</NavLink></li>
                    <li><NavLink 
                        to="/register"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Sign Up</NavLink></li>
                    <li><NavLink 
                        to="/signin"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Log In</NavLink></li>
                </ul> 
            </div>
        </div>
    )
}

export default SignedOutLinks; 