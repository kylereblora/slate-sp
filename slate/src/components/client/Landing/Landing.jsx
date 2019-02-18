import React from 'react';
import './landing.css';
import { Button } from 'semantic-ui-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

class Landing extends React.Component {
    
    handleGetStartedClick = (event) => {
        window.location.href = '/signin';
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className="landing-main">
                    <div className="landing-header">
                        <span>
                            <h1>Local minds, great designs.</h1>
                            <p>Browse item collections and hire experienced pros.</p>
                            <Button size="large" color="orange" onClick = {this.handleGetStartedClick}>Get Started</Button>
                        </span>
                    </div>
                    
                    <div className="shop-preview">
                        <p>What's hot</p>
                        <p>Browse trending items in the Shop</p>
                    </div>

                    <div className="pros-prods-action-header">
                        <div className="shop-items">
                            <span>
                                <h1>Shop for Items</h1>
                                <Button size="large" color="orange" onClick = {() => {window.location.href = '/shop'}}>Shop ></Button>
                            </span>
                        </div>

                        <div className="hire-pros">
                            <span>
                                <h1>Search for Pros</h1>
                                <Button size="large" color="orange" onClick = {() => {window.location.href = '/hire'}}>Hire ></Button>
                            </span>
                        </div>
                    </div>
                </div>
                <Footer />
                
            </div>
        );
    }
}


export default Landing;