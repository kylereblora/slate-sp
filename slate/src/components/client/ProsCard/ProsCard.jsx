import React from 'react';
import './proscard.css';
import PlaceholderImg from '../../../assets/img/placeholderhouse.jpg';
// import { Button } from 'semantic-ui-react';


const ProsCard = props => {
    return (
        <div className="pros-card-main">
            <div className="pros-picture">
                <img src={PlaceholderImg} alt="house"/>
            </div>

            <div className="pros-misc">
                <span className="pros-name">{props.proName}</span>
                <p className="pros-location">{props.proLocation}</p>
                <p className="pros-description">{props.proDescription}</p>
            </div>

            <div className="card-action">
                <button>View</button>
            </div>
        </div>
    )
}

export default ProsCard;