import React from 'react';
import { NavLink } from 'react-router-dom';
import './signedoutlinks.css';

const SignedInLinks = () => {
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
                        to="/wishlist/:id"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Wishlist</NavLink></li>
                    <li><NavLink 
                        to="/notifications/:id"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Notifications</NavLink></li>
                    <li><NavLink 
                        to="/profile/:id"
                        className="navlink-hover"
                        activeClassName="active-item"
                        >KBR</NavLink></li>
                </ul> 
            </div>
        </div>
    )
}

export default SignedInLinks; 