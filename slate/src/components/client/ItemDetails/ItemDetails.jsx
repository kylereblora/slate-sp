import React, { Component } from 'react'
import { Button, Rating, Divider, Dimmer, Loader } from 'semantic-ui-react'
import './itemdetails.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { addItemToWishlist } from '../../../store/actions/wishlistActions'
import { addItemToCart } from '../../../store/actions/cartActions'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { getProductFromWishlist } from '../Wishlist/wishlistFunctions'
import { loginBtn, cartButton } from '../../../assets/styles/styles'
import { numberWithCommas } from './priceWithCommas'
import AddItemReview from '../ItemReviews/AddItemReview/AddItemReview'
import ItemReviews from '../ItemReviews/ItemReviews';

export class ItemDetails extends Component {
    state = {
        addedToWishlist: false,
        addedToCart: false,
        itemQty: "1",
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


    handleAddToCart = (e) => {

        if(this.props.auth.uid) {
            this.props.addItemToCart(this.props.id, this.state.itemQty ,this.props.auth.uid).then(() => {
                this.setState({addedToCart: true})
            })
        } else {
            window.location.href = '/signin'
        }
    }

    handleChangeItemQty = (e) => {
        this.setState({itemQty:e.target.value});
        
    }

    render() {
        const { id, product, products, auth, profile, wishlist, cart, users, userId } = this.props;
        let inWishlist, inCart = null

        
        if (wishlist) {
            inWishlist = wishlist.find(getProductFromWishlist(id))

            if (products && products[id] === undefined) window.location.href='/404';
            
        }

        if (cart) {
            inCart = cart.find(getProductFromWishlist(id))

            if (products && products[id] === undefined) window.location.href='/404';
            
        }

        
        
        
        if (product) {
            return (
                <div className="item-site">
                    <Navbar />
                    <div className="item-details-main">
                        <div className="item-info">
                            <div className="item-two-columns">

                                <div className="responsive-container-details">
                                    <div className="item-picture-details">
                                        <span className="helper"></span>
                                        <img src={ product.itemImageUrl } alt="placeholder"/>
                                    </div>
                                </div>

                                <div className="spacer"/>
                                <div className="item-info-2">
                                    <div>
                                        <p className="item-name">{ product.itemName }</p>
                                        <p className="item-seller">by {product.seller}</p>
                                        <div className="item-rating-summary">
                                            <div>
                                                <Rating icon="star" defaultRating = { product.itemRating } maxRating = {5} disabled/>                
                                            </div>
                                            
                                            <div className="rating-count"><p>{product.itemReviews.length} Ratings</p></div>
                                        </div>
                                        <p className="item-price">&#8369;{ numberWithCommas(product.itemPrice) }</p>
                                        <div className="quantity">
                                            <label><span>{product.itemQuantity}</span> in stock</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="item-info-quantity">
                                            <div className="quantity-dropdown">
                                                <label htmlFor="input">Qty: </label>
                                                <input onChange={this.handleChangeItemQty} type="number" min='1' max={product.itemQuantity} placeholder='1'/>
                                            </div>
                                            
                                            <div className="spacer"></div>

                                            <div className="add-to-wishlist">
                                                { 
                                                    this.state.addedToWishlist || inWishlist ? 
                                                    <Button  disabled>Added to Wishlist</Button>
                                                    :
                                                    <Button  style={cartButton} onClick={this.handleAddToWishlist}>Add to Wishlist</Button>
                                                }

                                                
                                            </div>
                                            
                                            <div className="add-to-cart">
                                                { 
                                                    this.state.addedToCart || inCart ? 
                                                    <Button  disabled>Added to Cart</Button>
                                                    :
                                                    <Button  style={loginBtn} onClick={this.handleAddToCart}>Add to Cart</Button>
                                                }
                                            </div>
                                        </div>

                                        <Divider />
                                        
                                        <div className="item-description">
                                            <p className="item-description-header">Item Description</p>
                                            <p className="item-description-content">{product.itemDescription}</p>
                                        </div>
                                        
                                        <Divider />
                                        

                                        <div className="item-reviews">
                                            <p className="item-description-header">Item Reviews</p>
                                            <div className="item-reviews-list">
                                                {
                                                    product.itemReviews.length > 0 ?

                                                    <ItemReviews reviews={product.itemReviews} users={users} />

                                                    :

                                                    <p className="item-description-content">This product does not currently have reviews.</p>
                                                }
                                            </div>
                                        </div>  
                                        

                                        {
                                            auth && product.itemReviews.filter(review => auth.uid === review.userId).length < 1 && profile.occupation !== 'Seller' ?
                                            
                                            <div>
                                                <Divider />
                                            
                                                <div className="add-item-reviews">
                                                    <p className="item-description-header">Submit a Review</p>
                                                    <AddItemReview product={product} id={id} auth={auth} profile={profile} userId={userId} />
                                                </div>    
                                            </div>
                                            :
                                            null
                                        }                                  
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
    const cart = users && state.firebase.auth.uid ? users[state.firebase.auth.uid].cart : null
    
    
    return {
        id,
        product,
        products,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users,
        userId: state.firebase.auth.uid,
        wishlist,
        cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToWishlist: (id, product, state) => dispatch(addItemToWishlist(id, product, state)),
        addItemToCart: (id, qty, state) => dispatch(addItemToCart(id, qty, state))
    }
} 

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(['products', 'users'])
)(ItemDetails)
