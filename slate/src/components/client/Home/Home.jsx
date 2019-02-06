import React from 'react';
import './home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Home = () => {
    return(
        <div>
            <Navbar />
            <div className = "home-main">
                <div className ="product-section">
                    <p className="product-section-heading">Discover home products</p>
                    
                </div>

                <div className ="pros-section">
                    <p className="pros-section-heading">Find pros for the design you need</p>
                    <div className="pros-holder">
                        <div className="architects">
                            <a href="/hire">Architects</a>
                        </div>

                        <div className="spacer-mini" />

                        <div className="intdes">
                            <a href="/hire">Interior Designers</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;