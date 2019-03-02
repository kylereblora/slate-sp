import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ItemInWishlist from './ItemInWishlist/ItemInWishlist'
import './wishlist.css'

export class Wishlist extends Component {
    render() {
        const { auth, profile, wishlist} = this.props;
        if (!auth.uid) return <Redirect to='/' />
        
        return (
            <div className="wishlist-site">
                <Navbar />
                <div className="wishlist-main">
                
                    <div className="wishlist-products">
                        <h1>Wishlist</h1>
                        {
                            wishlist && wishlist.length > 0 ? 
                            wishlist.map(product => {
                                return (
                                    <ItemInWishlist product={product} key={product.id} currentUser={auth.uid}/>
                                )
                            })
                            :
                            <p>No items in wishlist yet.</p>
                        }
                    </div>
                
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const wishlist = users ? users[id].wishlist : null 

    return { 
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        wishlist
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users'])
)(Wishlist)
