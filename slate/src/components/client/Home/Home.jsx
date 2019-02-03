import React from 'react';
import './home.css';

const Home = () => {
    return(
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
        
    )
}

export default Home;