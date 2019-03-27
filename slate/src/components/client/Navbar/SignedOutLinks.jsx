import React from 'react';
import { NavLink } from 'react-router-dom';
import './signedoutlinks.css';

const SignedOutLinks = () => {
    
    return(
        <div className="menu-choices">
            <div className="navbar-logo">
                   <h1><a href="/">slate</a></h1>
            </div>

            <label className="hamburger" htmlFor="toggle">&#9776;</label>
            <input type="checkbox" id="toggle"/>
            <div className="navbar-items">
                <NavLink 
                    to="/shop"
                    className="navlink-hover"
                    activeClassName="active-item"
                    >Shop</NavLink> 
                <NavLink 
                    to="/hire/architects"
                    className="navlink-hover"
                    activeClassName="active-item"
                    >Hire</NavLink>
                <NavLink 
                    to="/register"
                    className="navlink-hover"
                    activeClassName="active-item"
                    >Sign Up</NavLink>
                <NavLink 
                    to="/signin"
                    className="navlink-hover"
                    activeClassName="active-item"
                    >Log In</NavLink>
            </div>
        </div>
    )
}

export default SignedOutLinks; 