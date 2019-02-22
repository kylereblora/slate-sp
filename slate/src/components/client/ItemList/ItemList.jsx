import React from 'react'
import ItemCard from '../ItemCard/ItemCard';
import './itemlist.css';
import { Link } from 'react-router-dom'


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


const ItemList = ({products}) => {

    return (
        <div className="items-list">
            <div className="items-list-main">

                <h1>Bath</h1>
                <div className="bath-products">
                    { products && products.filter(isBath).map(product => {
                        return(
                            <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                <ItemCard product={product} />
                            </Link>
                        )
                    })}
                </div>
                
                <h1>Curtains and Blinds</h1>
                <div className="bath-products">
                    { products && products.filter(isCurtains).map(product => {
                        return(
                            <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                <ItemCard product={product} />
                            </Link>
                        )
                    })}
                </div>


                <h1>Home Interior</h1>
                <div className="bath-products">
                    { products && products.filter(isHomeInterior).map(product => {
                        return(
                            <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                <ItemCard product={product} />
                            </Link>
                        )
                    })}
                </div>


                <h1>Lightings and Fans</h1>
                <div className="bath-products">
                    { products && products.filter(isLightings).map(product => {
                        return(
                            <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                <ItemCard product={product} />
                            </Link>
                        )
                    })}
                </div>


                <h1>Walls and Flooring</h1>
                <div className="bath-products">
                    { products && products.filter(isWalls).map(product => {
                        return(
                            <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                <ItemCard product={product} />
                            </Link>
                        )
                    })}
                </div>

            </div>
            

        </div>
    )
}

export default ItemList
