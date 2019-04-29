import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ItemInWishlist from './ItemInWishlist/ItemInWishlist'
import './wishlist.css'
import RelaxingSVG from '../../../assets/img/blankcanvas.svg'
import { getProductFromWishlist } from './wishlistFunctions'
import { Button } from 'semantic-ui-react';
import { loginBtn } from '../../../assets/styles/styles';



export class Wishlist extends Component {

    handleShopItems = () => {
        window.location.href='/shop'
    }

    render() {
        const { auth, wishlist, products, cart, id } = this.props;
        let tempWishlist = [];

        if (!auth.uid) return <Redirect to='/' />
        if (auth.uid !== id) return <Redirect to={'/wishlist/'+ auth.uid} />

        if (wishlist && wishlist.length > 0 && products) {
            wishlist.map((productId, index) => {
                let p = products.filter(getProductFromWishlist(productId.id))[0];
                
                if(p) { tempWishlist.push(p) }
                
            })
            
        }
        
        
        return (
            <div className="wishlist-site">
                <Navbar />
                <div className="wishlist-main">
                
                    <div className="wishlist-products">
                        <h1>Wishlist</h1>
                        <p className="wishlist-subheading-p">Add items to your wishlist for future purchases</p>
                        {
                            tempWishlist && tempWishlist.length > 0 && products ? 
                            tempWishlist.map((productId, index) => {
                                let p = products.filter(getProductFromWishlist(productId.id))[0];
                                
                                    return (
                                        <ItemInWishlist product={p} key={p.id} currentUser={auth.uid} cart={cart}/>
                                    )
                            })
                            :
                            <div className="wishlist-svg">
                                <img src={RelaxingSVG} alt="svgfile"/>
                                <p>Your wishlist seems empty...</p>
                                <Button style={loginBtn} content='Continue Shopping' onClick={this.handleShopItems} />
                            </div>
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
    const cart = users ? users[id].cart : null 
    

    return { 
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        products: state.firestore.ordered.products,
        wishlist,
        cart,
        id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users', 'products'])
)(Wishlist)
