import React, { Component } from 'react'
import './home.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ItemCard from '../ItemCard/ItemCard';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


export class Home extends Component {
    render() {
        const { auth } = this.props;

        // ROUTE GUARD -- if the user isn't logged in yet and tries to access this component, redirect.
        if (!auth.uid) return <Redirect to='/signin' />
        // admin email
        if (auth.email === 'tester@gmail.com') return <Redirect to='/home/admin' />

        return (
            <div className="home-site">
                <Navbar />
                <div className = "home-main">
                    <div className ="product-section">
                        <p className="product-section-heading">Discover home products</p>
                        <div className="product-previews">
                            
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
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth : state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps)
)(Home);