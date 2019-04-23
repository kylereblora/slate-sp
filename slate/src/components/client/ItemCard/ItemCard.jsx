import React from 'react' // rafce
import './itemcard.css';
import { Rating } from 'semantic-ui-react'
import { numberWithCommas } from '../ItemDetails/priceWithCommas'

const truncateText = (s) => {
    if (s.length > 30) return s.substring(0, 30) + '...'
    else return s
}

const ItemCard = ({product}) => {
    

    return (
        <div className="item-card">
            <div className="item-card-main">
                <div className="responsive-container">
                    <div className="dummy"></div>
                    
                    <div className="item-picture">
                        <img src={product.itemImageUrl} alt={product.itemName}/>
                    </div>
                </div>

                <div className="spacer" />

                <div className="item-misc">
                    <p className="item-category">{product.itemCategory}</p>
                    <p className="item-name">{truncateText(product.itemName)}</p>
                    <p className="item-price-card">&#8369;{numberWithCommas(product.itemPrice) }</p>
                    <Rating icon="star" defaultRating = {product.itemRating} maxRating = {5} disabled/>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
