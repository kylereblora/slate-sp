import React from 'react'
import { Button, Rating } from 'semantic-ui-react'
import './itemdetails.css';
import PlaceholderImg from '../../../assets/img/placeholderhouse.jpg';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const ItemDetails = (props) => {
    const category = props.match.params.category;
    const id = props.match.params.id;

    return (
        <div className="item-site">
            <Navbar />
            <div className="item-details-main">
                <div className="item-info">
                    <div className="item-picture">
                        <img src={PlaceholderImg} alt="placeholder"/>
                    </div>

                    <div className="item-info-2">
                        <p className="item-name">{id}</p>
                        <Rating icon="star" defaultRating = {4} maxRating = {5} disabled/>                
                        <p className="item-price">$562.00</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ItemDetails
