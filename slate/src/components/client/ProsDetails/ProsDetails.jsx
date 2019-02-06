import React from 'react'
import { Button, Rating } from 'semantic-ui-react'
import './prosdetails.css';
import PlaceholderImg from '../../../assets/img/architectural-banner.jpg';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const ProsDetails = (props) => {
    const category = props.match.params.category;
    const id = props.match.params.id;

    return (
        <div>
            <Navbar />
            <div className="pros-details-main">
                <div className="basic-info-header">
                    <div className="pro-picture">
                        <img src={PlaceholderImg} alt="placeholder"/>
                    </div>

                    <div className="name-loc-rating">
                        <h1>{category} {id}</h1>
                        <p>Quezon City</p>
                        <p>{category}</p>
                        <Rating icon="star" defaultRating = {4} maxRating = {5} disabled/>                
                    </div>
                    
                    <div className="spacer" />

                    <div className="call-to-action-btn">
                        <Button inverted color="orange">Contact</Button>
                    </div>
                    
                </div>

                <div className="pro-description">
                    <p className="desc">Description</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className="projects-summary">
                    <p className="projs">Projects</p>

                </div>

                <div className="pro-reviews">
                    <p className="reviews">Reviews</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProsDetails;
