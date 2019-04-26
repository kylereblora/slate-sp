import React, { Component } from 'react'
import './profile.css'
import EditProfile from './EditProfile/EditProfile';
import { Rating } from 'semantic-ui-react';

export class ProfileHeader extends Component {
    truncateText(s) {
        let r = s.toString();

        if (r.length > 4) return r.substring(0,4);
        else return r
        
        
    }

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
                        <div className="header-rating">
                        {
                            user.occupation === ('Architect' || 'Interior Designer')
                            ?
                            <div className="rating-summary">
                                <Rating rating={user.proRating} icon='star' disabled maxRating={5}/>
                                <span>{this.truncateText(user.proRating)}/5</span>
                            </div>
                            :
                            null
                        }
                        </div>
                       
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
                    
                    <div className="spacer-profile"></div>
                
                    <div className="contact-btn">
                        
                        
                        <div className="editprofile">
                        {
                            id && auth && id === auth.uid && user.occupation !== 'Seller' ? 
                            <EditProfile user={user} id={id} /> : null
                        }
                        </div>
                    </div>
                </div>

                
            </div>
        )
    }
}

export default ProfileHeader
