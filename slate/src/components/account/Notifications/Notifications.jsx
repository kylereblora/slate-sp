import React, { Component } from 'react'
import Navbar from '../../client/Navbar/Navbar'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './notifications.css'
import NotifCard from './NotifCard/NotifCard'


export class Notifications extends Component {
    render() {
        const { auth, notifications } = this.props

        if (!auth.uid) return <Redirect to='/' />
        
        if (notifications) console.log(notifications);
        

        return (
            <div className="notifications-site">
                <Navbar />
                <div className="notifications-main">
                    <div className="notifications">
                        <h1>Notifications</h1>
                        {
                            notifications && notifications.map(notif => {
                                if (notif.userId === auth.uid) return (
                                   <NotifCard notif={notif} key={notif.id}/>
                                )
                            })
                        }
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
        notifications: state.firestore.ordered.notifications
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'notifications', orderBy: ['time', 'desc']}])
)(Notifications)
