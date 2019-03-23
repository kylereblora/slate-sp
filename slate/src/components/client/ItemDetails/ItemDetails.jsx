import React, { Component } from 'react'
import { Button, Rating, Divider, Dimmer, Loader} from 'semantic-ui-react'
import './itemdetails.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { addItemToWishlist } from '../../../store/actions/wishlistActions'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { getProductFromWishlist } from '../Wishlist/wishlistFunctions'
import { Redirect } from 'react-router-dom'
import { loginBtn } from '../../../assets/styles/styles'


export class ItemDetails extends Component {
    state = {
        addedToWishlist: false
    }

    handleAddToWishlist = (e) => {

        if(this.props.auth.uid) {
            this.props.addItemToWishlist(this.props.id, this.props.product, this.props.auth).then(() => {
                this.setState({addedToWishlist: true})
            })
        } else {
            window.location.href = '/signin'
        }
    }

    render() {
        const { id, product, auth, wishlist } = this.props;
        let inWishlist = null

        if (wishlist) {
            inWishlist = wishlist.find(getProductFromWishlist(id))
        }
        
        
        if (product) {
            return (
                <div className="item-site">
                    <Navbar />
                    <div className="item-details-main">
                        <div className="item-info">
                            <div className="item-two-columns">

                                <div className="responsive-container-details">
                                    <div className="dummy"></div>
                                    <div className="item-picture-details">
                                        <img src={ product.itemImageUrl } alt="placeholder"/>
                                    </div>
                                </div>

                                <div className="spacer"/>
                                <div className="item-info-2">
                                    <div>
                                        <p className="item-name">{ product.itemName }</p>
                                        <Rating icon="star" defaultRating = { product.itemRating } maxRating = {5} disabled/>                
                                        <p className="item-price">&#8369;{ product.itemPrice }</p>
                                    </div>
                                    <div>
                                        <div className="item-info-quantity">
                                            <div className="quantity">
                                                <label htmlFor="input">Quantity: </label>
                                                <input type="number" min='1' max={product.itemQuantity} placeholder='1'/>
                                            </div>
                                            <div className="add-to-wishlist">
                                                { 
                                                    this.state.addedToWishlist || inWishlist ? 
                                                    <Button fluid disabled>Added to Wishlist</Button>
                                                    :
                                                    <Button fluid style={loginBtn} onClick={this.handleAddToWishlist}>Add to Wishlist</Button>
                                                }
                                            </div>
                                        </div>

                                        <div className="item-quantity-remaining">
                                            <p>{product.itemQuantity} remaining</p>
                                        </div>
                                        
                                        <Divider />
                                        
                                        <div className="item-description">
                                            <p className="item-description-header">Item Description</p>
                                            <p>{product.itemDescription}</p>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        } else {
            return (
                <div>
                    <Dimmer active inverted>
                        <Loader inverted></Loader>
                    </Dimmer>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const products = state.firestore.data.products
    const product = products ? products[id] : null
    const users = state.firestore.data.users
    const wishlist = users && state.firebase.auth.uid ? users[state.firebase.auth.uid].wishlist : null
    
    return {
        id,
        product,
        auth: state.firebase.auth,
        wishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToWishlist: (id, product, state) => dispatch(addItemToWishlist(id, product, state))
    }
} 

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(['products', 'users'])
)(ItemDetails)
