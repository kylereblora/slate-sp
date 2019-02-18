import React from 'react';
import './navbar.css';
import '../../../assets/fonts/style.css';
import SignedOutLinks from './SignedOutLinks';   
import SignedInLinks from './SignedInLinks';   
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
    
    return (
        <header className="navbar"> 
            <nav className="navbar-main">
                <div className="navbar-logo">
                    <h1><a href="/">slate</a></h1>
                </div>
                <div className="spacer" />
                { links }
                
            </nav>
        </header>
    )
    

};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);