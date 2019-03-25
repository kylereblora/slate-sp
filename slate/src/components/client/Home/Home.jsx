import React, { Component } from 'react'
import './home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ItemCard from '../ItemCard/ItemCard';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import { getRandom } from './getRandomPreviews'

export class Home extends Component {
    render() {
        const { auth, products } = this.props;
        let productPreviewArr = null;
        // ROUTE GUARD -- if the user isn't logged in yet and tries to access this component, redirect.
        if (!auth.uid) return <Redirect to='/signin' />

        // admin email
        if (auth.email === 'tester@gmail.com') return <Redirect to='/home/admin' />

        if(products) {
            productPreviewArr = getRandom(products, 1);
        }

        return (
            <div>
                {
                    products && productPreviewArr ? 

                    <div className="home-site">
                        <Navbar />
                        <div className = "home-main">
                            <div className="home-content">
                                <div className ="product-section">
                                    <p className="product-section-heading">Discover home products</p>
                                    <div className="product-previews">
                                        {
                                            productPreviewArr.map(product => {
                                                return (
                                                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                                                        <ItemCard product={product}/>
                                                    </Link>
                                                )
                                            })
                                        }
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
                        </div>
                        <Footer />
                    </div>

                    :

                    <div>
                        <Dimmer active inverted>
                            <Loader inverted></Loader>
                        </Dimmer>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth,
        products : state.firestore.ordered.products
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'products' }
    ])
)(Home);