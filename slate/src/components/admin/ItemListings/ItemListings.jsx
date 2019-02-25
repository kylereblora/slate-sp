import React from 'react'
import './itemlistings.css';
import ItemPreviews from '../ItemPreviews/ItemPreviews';

// functions for filtering the products
function isBath(obj) {
    return obj.itemCategory === 'Bath'
}

function isCurtains(obj) {
    return obj.itemCategory === 'Curtains and Blinds'
}

function isHomeInterior(obj) {
    return obj.itemCategory === 'Home Interior'
}

function isLightings(obj) {
    return obj.itemCategory === 'Lightings and Fans'
}

function isWalls(obj) {
    return obj.itemCategory === 'Walls and Flooring'
}


const ItemListings = ({products}) => {
    return (
        <div className="item-listings-main">

            <h1>Bath</h1>
                <div className="bath-products-preview">
                    { products && products.filter(isBath).map(product => {
                        return(
                            <ItemPreviews product={product} key={product.id}/>
                        )
                    })}
                </div>
                
                <h1>Curtains and Blinds</h1>
                <div className="bath-products-preview">
                    { products && products.filter(isCurtains).map(product => {
                        return(
                            <ItemPreviews product={product} key={product.id}/>
                        )
                    })}
                </div>


                <h1>Home Interior</h1>
                <div className="bath-products-preview">
                    { products && products.filter(isHomeInterior).map(product => {
                        return(
                            <ItemPreviews product={product} key={product.id}/>
                        )
                    })}
                </div>


                <h1>Lightings and Fans</h1>
                <div className="bath-products-preview">
                    { products && products.filter(isLightings).map(product => {
                        return(
                            <ItemPreviews product={product} key={product.id}/>
                        )
                    })}
                </div>


                <h1>Walls and Flooring</h1>
                <div className="bath-products-preview">
                    { products && products.filter(isWalls).map(product => {
                        return(
                            <ItemPreviews product={product} key={product.id}/>
                        )
                    })}
                </div>
        </div>
    )
}

export default ItemListings
