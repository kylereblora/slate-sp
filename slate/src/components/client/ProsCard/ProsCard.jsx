import React from 'react';
import './proscard.css';
import PlaceholderImg from '../../../assets/img/placeholderhouse.jpg';
import { Button, Rating, Divider } from 'semantic-ui-react';


const ProsCard = ({pro}) => {
    return (
        <div className="pros-card">
            <div className="pros-card-main">
                <div className="pros-picture">
                    <img src={PlaceholderImg} alt="house"/>
                </div>

                <div className="pros-misc">
                    <div className="pros-details">
                        <span className="pros-name">{pro.proName}</span>
                        <p className="pros-location">{pro.proLocation}</p>
                        <Rating icon="star" defaultRating = {4} maxRating = {5} disabled/>
                        <p className="pros-description">{pro.proDescription}</p>
                    </div>

                    <div className="spacer" />
                    <p className="contact-no">{pro.contactNumber}</p>
                </div>

                <div className="spacer" />
                <div className="card-action">
                    <Button inverted color="orange">View</Button>
                </div>
            </div>
            <div className="divider-container">
                <Divider />
            </div>
        </div>
    )
}

export default ProsCard;