import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './wishlist.css'

function isWishlistAuthorCurrentUid(uid) {
    return function(obj) {
        return obj.wishlistAuthor === uid;
    }
}

export class Wishlist extends Component {
    render() {
        const { auth, profile, wishlist } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        
        return (
            <div className="wishlist-site">
                <Navbar />
                <div className="wishlist-main">
                    <div className="wishlist-products">
                        <h1>Wishlist</h1>
                        {
                            wishlist ? 
                            wishlist.filter(isWishlistAuthorCurrentUid(auth.uid)).map(product => {
                                return (
                                    <div>{product.itemName}</div>
                                )
                            })
                            :
                            <p>You have no products in your wishlist yet.</p>
                        }
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
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        wishlist: state.firestore.ordered.wishlist
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'wishlist' }
    ])
)(Wishlist)
