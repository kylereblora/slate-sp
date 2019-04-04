import React, { Component } from 'react'
import Navbar from '../../client/Navbar/Navbar';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './superadminhome.css'

export class SuperAdminHome extends Component {
    render() {
        const { auth, occupation, users } = this.props;

        if(!auth.uid) return <Redirect to='/' />

        if (occupation && occupation !== 'Admin') return <Redirect to='/signin' />

        return (
            <div className="super-admin-home-site">
                <Navbar />
                <div className="super-admin-home-main">
                    <div className="user-list-section">
                        <p>Hey! im a super admin!</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    
    return {
        auth: state.firebase.auth,
        occupation : state.firebase.profile.occupation,
        users : state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'users' }
    ])
)(SuperAdminHome)
