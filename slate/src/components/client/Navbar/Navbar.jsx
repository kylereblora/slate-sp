import React from 'react';
import './navbar.css';
import '../../../assets/fonts/style.css';
import SignedOutLinks from './SignedOutLinks';   
import SignedInLinks from './SignedInLinks';   

const Navbar = props => (
    <header className="navbar">
        <nav className="navbar-main">
            <div className="navbar-logo">
                <h1><a href="/">slate</a></h1>
            </div>
            <div className="spacer" />
            {/* <Col>hhh</Col> */}
            <SignedOutLinks />
            <SignedInLinks /> 
             
        </nav>
    </header>
);

export default Navbar;