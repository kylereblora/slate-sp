import React from 'react';
import './landing.css';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import ItemCard from '../ItemCard/ItemCard';
import { getRandom } from '../Home/getRandomPreviews'
import { loginBtn } from '../../../assets/styles/styles';
import HeroImage from '../../../assets/img/heroimage4.png'
import FindPros from '../../../assets/img/find-pros.svg';
import ViewAndRatePros from '../../../assets/img/view-rate-pros.svg';

class Landing extends React.Component {
    
    handleGetStartedClick = (event) => {
        window.location.href = '/signin';
    }

    

    render() {
        const { auth, products } = this.props;
        let productPreviewArr = null;
        
         // ROUTE GUARD -- if the user isn't logged in yet and tries to access this component, redirect.
        if (auth.uid) return <Redirect to='/home' />

        if(products && products.length > 0) {
            let previewNumber = 0;
            if(products.length > 4) previewNumber = 4;
            else previewNumber = products.length;

            productPreviewArr = getRandom(products, previewNumber);
        } else if(products && products.length === 0){
            productPreviewArr = []
        } 

        return(
            <div className="landing-site">
                <Navbar />
                {
                    products ?
                    
                    <div>
                        <main className="container">
                            <div className="hero container">
                                <h1>Local minds,<br/>great designs.</h1>
                                <p>Browse item collections and hire experienced pros.</p>
                                <Button style={loginBtn} onClick={this.handleGetStartedClick} content='Get Started' />
                            </div>
                            <div className="illustration">
                                <div className="fig">
                                    <img src={HeroImage} alt="hero image"/>
                                </div>
                            </div>
                        </main>
                        
                        <div className="browse-items container">
                            <h3>Browse products from the Shop</h3>
                            <div className="landing-item-previews">
                                {
                                    products && productPreviewArr && productPreviewArr.length > 0 ?

                                    productPreviewArr.map(product => {
                                        return (
                                            <Link className='landing-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                                <ItemCard product={product}/>
                                            </Link>
                                        )
                                    })

                                    :

                                    <p>No products currently listed.</p>
                                }
                            </div>
                        </div>

                        <div className="discover-pros container">
                            <h3>Discover home professionals</h3>
                            <div className="discover-pros-cards">
                                <div className="landing-pro-card">
                                    <div className="fig-pro">
                                        <img src={FindPros} alt="Find professionals"/>
                                    </div>

                                    <div className="headings">
                                        <h2>Find pros for your next project</h2>
                                        <p>Choose from a wide variety of architects and interior designers</p>
                                    </div>
                                </div>

                                <div className="landing-pro-card">
                                    <div className="fig-pro">
                                        <img src={ViewAndRatePros} alt="View and rate pros"/>
                                    </div>

                                    <div className="headings">
                                        <h2>View and rate professionals</h2>
                                        <p>Rate and review professionals you've worked with before</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    :

                    <Dimmer active inverted>
                        <Loader inverted></Loader>
                    </Dimmer>
                    
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth,
        products : state.firestore.ordered.products,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['products', 'users'])
)(Landing);