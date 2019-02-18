import React from 'react';
import './home.css';
import Navbar from '../../client/Navbar/Navbar';
import Footer from '../../client/Footer/Footer';
import ItemCard from '../../client/ItemCard/ItemCard';
import { Button } from 'semantic-ui-react';

const Home = () => {

    const handleClick = () => {
        window.location.href = '/create_item';
    }

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
                    <div className="no-listings-yet">
                        <span className="no-listings-span"><h1>No listings yet. Add a new item to list!</h1></span>
                    </div>
                    
                    <div className="listing-previews">
                        <h1>product previews</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;