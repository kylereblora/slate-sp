import React from 'react';
import './home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ItemCard from '../ItemCard/ItemCard';

const Home = () => {
    return(
        <div className="home-site">
            <Navbar />
            <div className = "home-main">
                <div className ="product-section">
                    <p className="product-section-heading">Discover home products</p>
                    <div className="product-previews">
                        <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                        <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                        <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                    </div>
                </div>

                <div className ="pros-section">
                    <p className="pros-section-heading">Find pros for the design you need</p>
                    <div className="pros-holder">
                        <div className="architects">
                            <a href="/hire/architect">Architects</a>
                        </div>

                        <div className="spacer-mini" />

                        <div className="intdes">
                            <a href="/hire/interior-designer">Interior Designers</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;