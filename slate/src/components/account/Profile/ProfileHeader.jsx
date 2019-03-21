import React, { Component } from 'react'
import './profile.css'
import { Button, Rating } from 'semantic-ui-react'
import EditProfile from './EditProfile/EditProfile';

export class ProfileHeader extends Component {
    render() {
        const {user, id, auth} = this.props;
        return (
            <div>
                <div className="profile-header-items">
                    <div className="profile-picture">
                        <img src={user.proImageUrl || "https://via.placeholder.com/150"} alt="avatar"/>
                    </div>
                    <div className="profile-name">
                        <h1>{user.firstName} {user.lastName}</h1>
                        {/* <h3>{user.contactNumber ? user.contactNumber : "No Contact Number"}</h3>
                        <h3>{user.province ? user.province : "No Location"}</h3> */}

                        {
                            user.occupation === 'Architect' ? 
                            <span className="architect-span">{user.occupation}</span>
                            :
                            <span className="intdes-span">{user.occupation}</span>
                        }
                    </div>
                    
                    <div className="spacer"></div>
                
                    <div className="contact-btn">
                        {
                            id && auth && id === auth.uid ? 
                            <EditProfile user={user} id={id} /> : null
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
