import React from 'react';
import './proscard.css';

const ProsCard = props => {
    return (
        <div className="pros-card-main">
            <span className="pros-name">{props.proName}</span>
            <p className="pros-location">{props.proLocation}</p>
            <p className="pros-description">{props.proDescription}</p>
        </div>
    )
}

export default ProsCard;