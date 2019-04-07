import React from 'react'
import moment from 'moment'
import './notifcard.css'

const NotifCard = ({notif}) => {
    return (
        <div className="notif-card-main">
            <p className="notif-sender">{notif.sender}</p>
            <p className="notif-content">{notif.content}</p>
            <div className="notif-date">
                {moment(notif.time.toDate()).fromNow()}
            </div>
            
        </div>
    )
}

export default NotifCard
