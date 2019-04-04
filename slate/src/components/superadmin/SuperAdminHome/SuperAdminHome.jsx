import React, { Component } from 'react'
import Navbar from '../../client/Navbar/Navbar';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './superadminhome.css'
import { Tab,  Dimmer, Loader } from 'semantic-ui-react'
import UserList from '../UserList/UserList'



export class SuperAdminHome extends Component {
    render() {
        const { users, auth, occupation } = this.props;
        let panes = null;

        if(!auth.uid) return <Redirect to='/' />

        if (occupation && occupation !== 'Admin') return <Redirect to='/signin' />

        if(users) {
            panes = [
                { menuItem: 'Users', pane: <Tab.Pane attached={false} key={'userlist'}><UserList users={users}/></Tab.Pane>},
                { menuItem: 'Reviews', pane: <Tab.Pane attached={false} key={'reviews'}>Reviews</Tab.Pane>},
            ]
        } 

        return (
            <div className="super-admin-home-site">
                <Navbar />
                {
                    panes !== null ?

                    <div className="super-admin-home-main">
                        <div className="user-list-section">
                            <Tab 
                                menu={{ secondary: true }} 
                                panes={panes} 
                                renderActiveOnly={false}
                            />
                        </div>
                    </div>

                    :

                    <Dimmer active inverted>
                        <Loader inverted></Loader>
                    </Dimmer>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : state.firestore.ordered.users,
        auth: state.firebase.auth,
        occupation : state.firebase.profile.occupation,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'users' }
    ])
)(SuperAdminHome)
