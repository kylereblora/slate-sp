import React from 'react';
import './homeadmin.css';
import Navbar from '../../client/Navbar/Navbar';
import Footer from '../../client/Footer/Footer';
import ItemListings from '../ItemListings/ItemListings';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const Home = (props) => {

    const handleClick = () => {
        window.location.href = '/create_item';
    }

    const { products, auth } = props;
    if (!(auth.email === 'tester@gmail.com')) return <Redirect to='/signin' />
    
    return(
        <div className="home-site">
            <Navbar />
            <div className = "home-admin-main">
                <div className ="listing-section">
                    <div className="listing-details">
                        <p className="listing-section-heading">Your Listings</p>
                        <div className="spacer" />
                        <div className="add-item-btn">
                            <Button color='orange' onClick={handleClick}>Add Item</Button>
                        </div>
                    </div>

                    { 
                        products ?
                        <ItemListings products={products}/>
                        : 
                        <div className="no-listings-yet">
                            <span className="no-listings-span"><h1>No listings yet. Add a new item to list!</h1></span>
                        </div> 
                    }
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

// get the products from the firestore database and assign it to this state's products
const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products,
        auth : state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'products' }
    ])
)(Home);