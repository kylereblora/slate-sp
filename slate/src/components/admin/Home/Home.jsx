import React from 'react';
import './home.css';
import Navbar from '../../client/Navbar/Navbar';
import Footer from '../../client/Footer/Footer';
import ItemCard from '../../client/ItemCard/ItemCard';
import ItemList from '../../client/ItemList/ItemList';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Home = (props) => {

    const handleClick = () => {
        window.location.href = '/create_item';
    }

    const { products } = props;
    return(
        <div className="home-site">
            <Navbar />
            <div className = "home-main">
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
                        <ItemList products={products}/>
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
        products: state.firestore.ordered.products
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'products' }
    ])
)(Home);