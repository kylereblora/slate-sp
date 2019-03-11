import React, { Component } from 'react'
import { Dimmer, Loader, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Navbar from '../../client/Navbar/Navbar'
import Footer from '../../client/Footer/Footer'
import './profile.css'
import { ProfileHeader } from './ProfileHeader';
import { ProfileProjects } from './ProfileProjects';

export class Profile extends Component {
    render() {
        const { id, auth, profile, user } = this.props;
        return (
            <div className="profile-site">
                <Navbar />
                {
                    profile && user ?
                    <div className="profile-main">
                        {
                            user.occupation === "Regular" || user.occupation === "Seller" ? 
                            <div className="profile-header">
                                <ProfileHeader user={user} id={id} auth={auth} />
                            </div>
                            :

                            <div>
                                {
                                    id === auth.uid ? 
                                
                                    <div className="profile-current-user">
                                        <div className="profile-header">
                                            <ProfileHeader user={user} id={id} auth={auth} />
                                        </div>

                                        <div className="profile-projects">
                                            <ProfileProjects user={user} isCurrent={true}/>
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
                                            <ProfileHeader user={user} id={id} auth={auth} />
                                        </div>

                                        <div className="profile-projects">
                                            <ProfileProjects user={user} isCurrent={false}/>
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
                        }
                    </div>

                    :

                    <div>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </div>
                }
                <Footer />
                
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
