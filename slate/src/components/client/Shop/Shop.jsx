import React, { Component } from 'react'
import ItemList from '../ItemList/ItemList'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './shop.css';

export class Shop extends Component {
    render() {
        return (
            <div className="shop-site">
                <Navbar />
                <div className="shop-main">
                    <ItemList />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Shop
