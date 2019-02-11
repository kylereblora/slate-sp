import React from 'react' // rafce
import './itemcard.css'
import PlaceholderImg from '../../../assets/img/placeholderhouse.jpg';
import { Button, Rating, Divider } from 'semantic-ui-react'

const ItemCard = (props) => {
    return (
        <div className="item-card">
            <div className="item-card-main">
                <div className="item-picture">
                    <img src={PlaceholderImg} alt="house"/>
                </div>

                <div className="item-misc">
                    <span className="item-name">{props.itemName}</span>
                    <p className="item-price">{props.itemPrice}</p>
                    <Rating icon="star" defaultRating = {4} maxRating = {5} disabled/>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
