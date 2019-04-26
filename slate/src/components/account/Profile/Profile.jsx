import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Navbar from '../../client/Navbar/Navbar'
import Footer from '../../client/Footer/Footer'
import './profile.css'
import { ProfileHeader } from './ProfileHeader';
import { ProfileProjects } from './ProfileProjects';
import AddReview from '../Reviews/Reviews'
import ReviewCard from '../Reviews/ReviewCard';

export class Profile extends Component {
    render() {
        const { id, auth, profile, user, currentlyLogged } = this.props;

        return (
            <div className="profile-site">
                <Navbar />
                {
                    profile && user ?
                    <div className="profile-main">
                       <div className="profile-content">
                       
                            {
                                user.occupation === "Regular" || user.occupation === "Seller" ? 
                                
                                <div className="profile-current-user-grid-container">
                                    <div className="profile-header">
                                        <ProfileHeader user={user} id={id} auth={auth} />
                                    </div>

                                    <div className="profile-description">
                                        <p className="description-heading">Description</p>
                                        <p className="description-content">{user.proDescription ? user.proDescription : "No Description Yet"}</p>
                                    </div>
                                </div>
                                :

                                <div className="profile-current-user-grid-container">
                                    <div className="profile-header">
                                        <ProfileHeader user={user} id={id} auth={auth} />
                                    </div>

                                    <div className="profile-description">
                                        <p className="description-heading">Description</p>
                                        <p className="description-content">{user.proDescription ? user.proDescription : "No Description Yet"}</p>
                                    </div>

                                    <div className="profile-projects">
                                        {
                                            id === auth.uid ? 

                                            <ProfileProjects user={user} id={id} isCurrent={true}/>
                                            :
                                            <ProfileProjects user={user} id={id} isCurrent={false}/>
                                            
                                        }

                                    </div>

                                    <div className="profile-reviews">
                                        <p className="review-heading">Reviews <span>{user.reviews.length} rating/s</span></p>
                                        {
                                            user.reviews.length > 0 ? 

                                            <div>
                                                {
                                                    user.reviews.map(review => {
                                                        return (
                                                            <div key={review.id}>
                                                                <ReviewCard review={review} />
                                                            </div>
                                                        )
                                                    })   
                                                }
                                            </div>
                                            :
                                            <div className="no-projects-yet">
                                                <span className="no-projects-span"><h1>No reviews for this pro yet.</h1></span>
                                            </div> 
                                        }
                                    </div>
                                    

                                    {
                                        auth && currentlyLogged && currentlyLogged.occupation !== ('Seller' || 'Admin') && id !== auth.uid && user.reviews.filter(review => auth.uid === review.userId).length < 1 ?

                                        <div className="rate-this-pro">
                                            <p className="rate-this-pro-heading">Rate this Pro</p>
                                            <p className="rate-this-pro-subheading">Worked with this pro before? Leave a review to let everyone know your experience!</p>
                                            <AddReview proId={id} currentUser={currentlyLogged.firstName + ' ' + currentlyLogged.lastName} auth={auth} />
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            }

                       </div>
                    </div>

                    :

                    <div>
                        <Dimmer active inverted>
                            <Loader inverted></Loader>
                        </Dimmer>
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
    const user = users ? users[id] : null;
    const currentlyLogged = users ? users[state.firebase.auth.uid] : null;

    return {
        id,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        user,
        currentlyLogged
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users'])
)(Profile)
