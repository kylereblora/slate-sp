import React, { Component } from 'react'
import './proscard.css';
import { Rating } from 'semantic-ui-react';
import { defaultBrandBtn } from '../../../assets/styles/styles';
import { Link } from 'react-router-dom'



export class ProsCard extends Component {

    truncateText = (s) => {
        if (s.length > 100) return s.substring(0, 100)+ '...';
        else return s
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
                            <Link className='pro-link-style' to={'/profile/'+ pro.id}>
                                <p className="pros-name">{pro.firstName} {pro.lastName}</p>
                            </Link>
                            <div className="info-container-pro">
                                <div className="icon-container-pro">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <p className="pros-location">{pro.province || "N/A"}</p>
                            </div>
                            
                            <Rating icon="star" defaultRating = {pro.proRating} maxRating = {5} disabled/>
                            
                            <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                <p className="pros-description">{this.truncateText(pro.proDescription)}</p>
                            </span>
                        </div>
    
                        <div className="spacer" />

                        <div className="info-container-pro">
                            <div className="icon-container-pro">
                                <i className="fas fa-phone"></i>
                            </div>
                            <p className="contact-no">{pro.contactNumber || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProsCard
