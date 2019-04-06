import React, { Component } from 'react'
import './profile.css'
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
                        {
                            user.occupation === 'Architect' ? 
                            <span className="architect-span">{user.occupation}</span>
                            :
                            <span className="intdes-span">{user.occupation}</span>
                        }

                        <div className="profile-info-misc">
                            <div className="info-container-profile">
                                <div className="icon-container-profile">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <p>{user.province ? user.province : "No Location"}</p>
                            </div>

                            <div className="info-container-profile">
                                <div className="icon-container-profile">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <p>{user.contactNumber ? user.contactNumber : "No Contact Number"}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="spacer"></div>
                
                    <div className="contact-btn">
                        {
                            id && auth && id === auth.uid && user.occupation !== 'Seller' ? 
                            <EditProfile user={user} id={id} /> : null
                        }
                    </div>
                </div>

                
            </div>
        )
    }
}

export default ProfileHeader
