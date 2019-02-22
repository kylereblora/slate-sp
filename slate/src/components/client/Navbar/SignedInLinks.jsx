import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import './signedoutlinks.css';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions'

const SignedInLinks = (props) => {
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
                        to={"/wishlist/" + props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Wishlist</NavLink></li>
                    <li><NavLink 
                        to={"/notifications/"+ props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Notifications</NavLink></li>
                    <li><NavLink 
                        to={"/profile/"+ props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >{props.profile.initials}</NavLink></li>
                    <li>
                        <a className="log-out" onClick={props.signOut}>Log Out</a>
                    </li>
                </ul> 
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks) 