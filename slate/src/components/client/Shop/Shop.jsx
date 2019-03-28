import React, { Component } from 'react'
import ItemList from '../ItemList/ItemList'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import './shop.css';
import SearchStandard from '../Search/SearchStandard';

export class Shop extends Component {
    render() {
        const { products } = this.props;
        return (
            <div className="shop-site">
                <Navbar />
                <div className="shop-main">
                    {
                        products ? 
                        
                        <div className="shop-container-with-search">
                            <div className="shop-content-with-search">
                                <div className="shop-search">
                                    <div className="shop-flex-container">
                                        <div className="shop-header">
                                            <h2>Shop Products</h2>
                                            <p>Browse a wide catalog of items for your home design needs.</p>
                                        </div>

                                        <div className="search-standard">
                                            <SearchStandard source={products} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="item-list-container-shop">
                                    <ItemList products={products} /> 
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <Dimmer active inverted>
                                <Loader inverted></Loader>
                            </Dimmer>
                        </div>
                    }
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
