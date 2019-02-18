import React, { Component } from 'react'
import ItemList from '../ItemList/ItemList'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './shop.css';

export class Shop extends Component {
    render() {
        const { products } = this.props;
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


// get the products from the firestore database and assign it to this state's products
const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'products' }
    ])
)(Shop)
