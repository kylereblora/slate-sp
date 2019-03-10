import React, { Component } from 'react'
import { Button, Form, Rating, Dimmer, Loader, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Navbar from '../../client/Navbar/Navbar'
import Footer from '../../client/Footer/Footer'
import './profile.css'

export class Profile extends Component {
    render() {
        const { id, auth, profile, user } = this.props;
        return (
            <div className="profile-site">
                {
                    profile && user ?
                    <div>
                        <Navbar />
                        <div className="profile-main">
                            {
                                id === auth.uid ? 
                                
                                <div className="profile-current-user">
                                    <div className="profile-header">
                                        <div className="profile-header-items">
                                            <div className="profile-picture">
                                                <img src={profile.proPicture ? profile.proPicture : "https://via.placeholder.com/150"} alt="avatar"/>
                                            </div>
                                            <div className="profile-name">
                                                <h1>{profile.firstName} {profile.lastName}</h1>
                                                <h3>{profile && profile.location ? profile.location : "No Location"}</h3>
                                                <Rating icon="star" defaultRating = { profile.proRating } maxRating = {5} disabled/>
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
                                            <p className="description-content">{profile.proDescription ? profile.proDescription : "No Description Yet"}</p>
                                        </div>

                                    </div>

                                    <div className="profile-projects">
                                        <div className="project-header">
                                            <p className="project-heading">Projects</p>
                                            <div className="spacer" />
                                            <div className="contact-btn">
                                                    <Button inverted color='orange' size='large'>Add Project</Button>
                                            </div>
                                        </div>
                                        {
                                            profile.proProjects ? 

                                            <div>Yay</div>
                                            :
                                            <div className="no-projects-yet">
                                                <span className="no-projects-span"><h1>No projects yet. Add one to display!</h1></span>
                                            </div> 
                                        }
                                    </div>

                                    <div className="profile-reviews">
                                        <p className="review-heading">Reviews</p>
                                        {
                                            profile.proReviews ? 

                                            <div>Yay</div>
                                            :
                                            <div className="no-projects-yet">
                                                <span className="no-projects-span"><h1>No reviews for this pro yet.</h1></span>
                                            </div> 
                                        }
                                    </div>
                                </div>
                                :
                                
                                <div className="profile-unlogged-user">
                                    <div className="profile-header">
                                        <div className="profile-header-items">
                                            <div className="profile-picture">
                                                <img src={user.proPicture ? user.proPicture : "https://via.placeholder.com/150"} alt="avatar"/>
                                            </div>
                                            <div className="profile-name">
                                                <h1>{user.firstName} {user.lastName}</h1>
                                                <h3>{user && user.location ? user.location : "No Location"}</h3>
                                                <Rating icon="star" defaultRating = { user.proRating } maxRating = {5} disabled/>
                                            </div>
                                        </div>

                                        <div className="profile-description">
                                            <p className="description-heading">Description</p>
                                            <p className="description-content">{user.proDescription ? user.proDescription : "No Description Yet"}</p>
                                        </div>

                                    </div>

                                    <div className="profile-projects">
                                        <div className="project-header">
                                            <p className="project-heading">Projects</p>
                                        </div>
                                        {
                                            user.proProjects ? 

                                            <div>Yay</div>
                                            :
                                            <div className="no-projects-yet">
                                                <span className="no-projects-span"><h1>No projects yet.</h1></span>
                                            </div> 
                                        }
                                    </div>

                                    <div className="profile-reviews">
                                        <p className="review-heading">Reviews</p>
                                        {
                                            user.proReviews ? 

                                            <div>Yay</div>
                                            :
                                            <div className="no-projects-yet">
                                                <span className="no-projects-span"><h1>No reviews for this pro yet.</h1></span>
                                            </div> 
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <Footer />
                    </div>

                    :

                    <div>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const users = state.firestore.data.users;
    const user = users ? users[id] : null

    return {
        id,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        user
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users'])
)(Profile)
