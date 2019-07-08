import React, { Component } from 'react'
import Navbar from '../../client/Navbar/Navbar'
import Footer from '../../client/Footer/Footer'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './notifications.css'
import NotifCard from './NotifCard/NotifCard'
import { Dimmer, Loader } from 'semantic-ui-react'
import NotFound from '../../../assets/img/notfound.svg';

function checkIfUserHasNotif(uid) {
    return function(notif) {
        return notif.userId === uid;
    }
}

export class Notifications extends Component {
    render() {
        const { auth, notifications } = this.props

        if (!auth.uid) return <Redirect to='/' />
        

        return (
            <div className="notifications-site">
                <Navbar />
                <div className="notifications-main">
                    <div className="notifications">
                        <h1>Notifications</h1>
                        {
                            notifications ?

                            <div>
                                 {
                                    notifications.filter(checkIfUserHasNotif(auth.uid)).length > 0 ?
                                    
                                    <div>
                                        {
                                            notifications.filter(checkIfUserHasNotif(auth.uid)).map(notif => {
                                                return (
                                                <NotifCard notif={notif} key={notif.id}/>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="notif-svg">
                                        <img src={NotFound} alt="svgfile"/>
                                        <p>You currently have no notifications.</p>
                                    </div>
                                }
                            </div>

                            :

                            <Dimmer active inverted>
                                <Loader inverted></Loader>
                            </Dimmer>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { 
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'notifications', orderBy: ['time', 'desc']}])
)(Notifications)
