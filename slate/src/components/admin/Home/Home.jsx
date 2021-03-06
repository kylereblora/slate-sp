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
import { loginBtn } from '../../../assets/styles/styles';

function checkIfSoldBySeller(id) {
    return function(element) {
        return element.sellerId === id;
    }
}


const Home = (props) => {

    const handleClick = () => {
        window.location.href = '/create_item';
    }

    const { auth, products, occupation } = props;
    let sellerProducts = null;

    if(!auth.uid) return <Redirect to='/' />
    if (occupation && occupation !== 'Seller') return <Redirect to='/signin' />
    if (products) sellerProducts = products.filter(checkIfSoldBySeller(auth.uid))

    return(
        <div className="home-site">
            <Navbar />
            <div className = "home-admin-main">
                <div className ="listing-section">
                    <div className="listing-details">
                        <p className="listing-section-heading">Your Listings</p>
                        <div className="spacer" />
                        <div className="add-item-btn">
                            <Button style={loginBtn} onClick={handleClick} content='Add Item' icon='add'/>
                        </div>
                    </div>

                    { 
                        products && sellerProducts ?
                        <ItemListings products={sellerProducts}/>
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
        auth: state.firebase.auth,
        products: state.firestore.ordered.products,
        occupation : state.firebase.profile.occupation
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'products' }
    ])
)(Home);