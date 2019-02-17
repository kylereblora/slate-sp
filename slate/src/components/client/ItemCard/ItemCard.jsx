import React from 'react' // rafce
import './itemcard.css'
import PlaceholderImg from '../../../assets/img/placeholderhouse.jpg';
import { Button, Rating, Divider } from 'semantic-ui-react'

const ItemCard = ({product}) => {
    return (
        <div className="item-card">
            <div className="item-card-main">
                <div className="item-picture">
                    <img src={product.itemImageUrl} alt="image"/>
                </div>

                <div className="item-misc">
                    <span className="item-name">{product.itemName}</span>
                    <p className="item-price">&#8369;{product.itemPrice}</p>
                    <Rating icon="star" defaultRating = {product.itemRating} maxRating = {5} disabled/>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
