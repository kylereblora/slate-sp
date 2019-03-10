import React, { Component } from 'react'
import './profile.css'
import { Button, Rating } from 'semantic-ui-react'

export class ProfileHeader extends Component {
    render() {
        const {user, id, auth} = this.props;
        return (
            <div>
                <div className="profile-header-items">
                    <div className="profile-picture">
                        <img src={user.proPicture ? user.proPicture : "https://via.placeholder.com/150"} alt="avatar"/>
                    </div>
                    <div className="profile-name">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <h3>{user && user.location ? user.location : "No Location"}</h3>
                        <Rating icon="star" defaultRating = { user.proRating } maxRating = {5} disabled/>
                    </div>
                    
                    <div className="spacer"></div>
                
                    <div className="contact-btn">
                        {
                            id && auth && id === auth.uid ? 
                            <Button inverted color='orange' size='large'>Edit Profile</Button>  : null
                        }
                    </div>
                </div>

                <div className="profile-description">
                    <p className="description-heading">Description</p>
                    <p className="description-content">{user.proDescription ? user.proDescription : "No Description Yet"}</p>
                </div>
            </div>
        )
    }
}

export default ProfileHeader
