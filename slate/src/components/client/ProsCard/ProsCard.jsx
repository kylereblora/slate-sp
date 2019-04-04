import React, { Component } from 'react'
import './proscard.css';
import { Button, Rating } from 'semantic-ui-react';
import { defaultBrandBtn } from '../../../assets/styles/styles';



export class ProsCard extends Component {

    handleClick = (e, id) => {
        window.location.href = '/profile/' + id;
    }

    render() {
        const { pro } = this.props;
        return (
            <div className="pros-card">
                <div className="pros-card-main">
                    <div className="pros-picture">
                        <img src={pro.projects[0] ? pro.projects[0].projectImageUrl : "https://via.placeholder.com/350x240"} alt="house"/>
                    </div>
    
                    <div className="pros-misc">
                        <div className="pros-details">
                            <p className="pros-name">{pro.firstName} {pro.lastName}</p>
                            <p className="pros-location">{pro.province || "N/A"}</p>
                            <Rating icon="star" defaultRating = {pro.proRating} maxRating = {5} disabled/>
                            <p className="pros-description">{pro.proDescription}</p>
                        </div>
    
                        <div className="spacer" />
                        <p className="contact-no">{pro.contactNumber || "N/A"}</p>
                    </div>
    
                    <div className="spacer" />
                    <div className="card-action">
                        <Button style={defaultBrandBtn} onClick={(e) => this.handleClick(e, pro.id)}>View</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProsCard
