import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './signedoutlinks.css';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions'


export class SignedInLinks extends Component {

    handleClick = () => {
        this.props.signOut().then(() => {window.location.href='/'})
    }

    render() {
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
                        to={"/wishlist/" + this.props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Wishlist</NavLink>
                    <NavLink 
                        to={"/notifications/"+ this.props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Notifications</NavLink>
                    <NavLink 
                        to={"/cart/"+ this.props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Cart</NavLink>
                    <NavLink 
                        to={"/orders/"+ this.props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        >Orders</NavLink>
                    <NavLink 
                        to={"/profile/"+ this.props.auth.uid}
                        className="navlink-hover"
                        activeClassName="active-item"
                        ><span className="profile-initials-circle">{this.props.profile.initials}</span></NavLink>
                    
                        <a className="log-out" onClick={this.handleClick}>Log Out</a>
                        
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks) 