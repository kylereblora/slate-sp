import React from 'react'
import moment from 'moment'

const NotifCard = ({notif}) => {
    return (
        <div className="notif-card-main">
            <p>{notif.content}</p>
            <div className="notif-date">
                {moment(notif.time.toDate()).fromNow()}
            </div>
            
        </div>
    )
}

export default NotifCard
