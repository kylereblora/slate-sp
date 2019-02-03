import React from 'react';
import './proscard.css';
import PlaceholderImg from '../../../assets/img/placeholderhouse.jpg';
import { Button, Rating } from 'semantic-ui-react';


const ProsCard = props => {
    return (
        <div className="pros-card-main">
            <div className="pros-picture">
                <img src={PlaceholderImg} alt="house"/>
            </div>

            <div className="pros-misc">
                <span className="pros-name">{props.proName}</span>
                <p className="pros-location">{props.proLocation}</p>
                <Rating icon="star" defaultRating = {4} maxRating = {5} disabled/>
                <p className="pros-description">{props.proDescription}</p>
            </div>

            <div className="spacer" />
            <div className="card-action">
                <Button inverted color="orange">View</Button>
            </div>
        </div>
    )
}

export default ProsCard;