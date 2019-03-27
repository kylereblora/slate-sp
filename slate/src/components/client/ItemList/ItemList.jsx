import React from 'react'
import ItemCard from '../ItemCard/ItemCard';
import './itemlist.css';
import { Link } from 'react-router-dom'
import { NavHashLink  } from 'react-router-hash-link';

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


const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth"
    });   
}

const ItemList = ({products}) => {

    return (
        <div className="shop-content">
            <div className="shop-content-grid-container">
                <div className="shop-sidenav">
                    <p>All Products</p>
                    <NavHashLink 
                        smooth 
                        className='shop-sidenav-link-style' 
                        activeClassName="shop-sidenav-selected" 
                        to='/shop#bath'
                        scroll={el => scrollWithOffset(el, 65)}
                        location={{pathname: document.location.pathname + document.location.hash}}
                        >Bath</NavHashLink >
                    <NavHashLink 
                        smooth 
                        className='shop-sidenav-link-style' 
                        activeClassName="shop-sidenav-selected" 
                        to='/shop#curtains'
                        scroll={el => scrollWithOffset(el, 65)}
                        location={{pathname: document.location.pathname + document.location.hash}}
                        >Curtains and Blinds</NavHashLink >
                    <NavHashLink 
                        smooth 
                        className='shop-sidenav-link-style' 
                        activeClassName="shop-sidenav-selected" 
                        to='/shop#home-interior'
                        scroll={el => scrollWithOffset(el, 65)}
                        location={{pathname: document.location.pathname + document.location.hash}}
                        >Home Interior</NavHashLink >
                    <NavHashLink 
                        smooth 
                        className='shop-sidenav-link-style' 
                        activeClassName="shop-sidenav-selected" 
                        to='/shop#lightings'
                        scroll={el => scrollWithOffset(el, 65)}
                        location={{pathname: document.location.pathname + document.location.hash}}
                        >Lightings and Fans</NavHashLink >
                    <NavHashLink 
                        smooth 
                        className='shop-sidenav-link-style'
                        activeClassName="shop-sidenav-selected"
                        to='/shop#walls-flooring'
                        scroll={el => scrollWithOffset(el, 65)}
                        location={{pathname: document.location.pathname + document.location.hash}}
                        >Walls and Flooring</NavHashLink >
                    
                </div>

                <div className="shop-item-list">
                    <div className="item-group-container" id="bath">
                        <h1>Bath</h1>
                        <div className="bath" >
                            { products && products.filter(isBath).map(product => {
                                return(
                                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                        <ItemCard product={product} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                   
                    <div className="item-group-container" id="curtains">
                        <h1>Curtains and Blinds</h1>
                        <div className="curtains">
                            { products && products.filter(isCurtains).map(product => {
                                return(
                                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                        <ItemCard product={product} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    

                    <div className="item-group-container" id="home-interior">
                        <h1>Home Interior</h1>
                        <div className="home-interior">
                            { products && products.filter(isHomeInterior).map(product => {
                                return(
                                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                        <ItemCard product={product} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    
                    <div className="item-group-container" id="lightings">
                        <h1>Lightings and Fans</h1>
                        <div className="lightings" >
                            { products && products.filter(isLightings).map(product => {
                                return(
                                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                        <ItemCard product={product} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="item-group-container" id="walls-flooring">
                        <h1>Walls and Flooring</h1>
                        <div className="walls-flooring">
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
            </div>
        </div>
    )
}

export default ItemList
