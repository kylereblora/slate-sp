import React, { Component } from 'react'
import ItemList from '../ItemList/ItemList'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import './shop.css';

export class Shop extends Component {
    render() {
        const { products } = this.props;
        console.log(products)
        return (
            <div className="shop-site">
                <Navbar />
                <div className="shop-main">
                    <ItemList products={products} />
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products
    }
}

export default connect(mapStateToProps)(Shop)
