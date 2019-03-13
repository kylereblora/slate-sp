import React from 'react';
import './navbar.css';
import '../../../assets/fonts/style.css';
import SignedOutLinks from './SignedOutLinks';   
import SignedInLinks from './SignedInLinks';   
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignedInLinks profile={profile} auth={auth}/> : <SignedOutLinks />
    

    return (
        <div className="navbar"> 
            <div className="navbar-main">
                {/* <div className="navbar-logo">
                    {
                        auth.uid ? <h1><a href="/home">slate</a></h1> : <h1><a href="/">slate</a></h1>
                    }
                </div>
                <div className="spacer"></div> */}

                
                <div className="menu">
                    { links }
                </div>
            </div>
        </div>
    )
    

};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(Navbar);