import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import RelaxingSVG from '../../../assets/img/blankcanvas.svg'
import './cart.css'
import { getProductFromWishlist } from '../Wishlist/wishlistFunctions'
import ItemInCart from './ItemInCart/ItemInCart';
import { numberWithCommas } from '../ItemDetails/priceWithCommas';
import { Button } from 'semantic-ui-react';
import { loginBtn } from '../../../assets/styles/styles';
import { checkout } from '../../../store/actions/cartActions';
import { Confirm } from 'semantic-ui-react'

export class Cart extends Component {
	state = {
		clicked: false,
		open: false,
		userCart: [],
	}

	open = () => this.setState({ open: true })
	
	close = () => this.setState({ open: false })
	

	handleCheckout = () => {
		this.setState({clicked: true} , () => {
			this.props.checkout(this.props.id).then(() => {
				this.open()
			});
		})
	}

	static getDerivedStateFromProps(props, state) {
		if(props.cart !== state.userCart) {
			return {
				userCart: props.cart
			}
		}
		return null;
	}


	render() {
		const { auth, products, id } = this.props;
		const { userCart } = this.state;
		let tempCart = [];
		let subtotal = 0;

        if (!auth.uid) return <Redirect to='/' />
        if (auth.uid !== id) return <Redirect to={'/cart/'+ auth.uid} />

        if (userCart && userCart.length > 0 && products) {
            userCart.map((product, index) => {
                let p = products.filter(getProductFromWishlist(product.id))[0];
				
				let newP = {product: p, qty: product.qty};

                if(newP) { tempCart.push(newP) }  
			})
		}

		if (tempCart.length > 0) {
			tempCart.map((product, index) => {
				let p = products.filter(getProductFromWishlist(product.product.id))[0];
				
				subtotal = subtotal + (parseInt((p.itemPrice), 10) * parseInt(product.qty, 10));
				
			})

		}

		return (
			<div className="cart-site">
				<Navbar />
                <div className="cart-main">
                    <div>
						{
							tempCart && tempCart.length > 0 && products ?

							<div className="cart-grid-container">
								<div className="cart-products">
									<h1>Cart</h1>
									{
										tempCart.map((product, index) => {
											let p = products.filter(getProductFromWishlist(product.product.id))[0];
											
												return (
													<ItemInCart product={p} qty={product.qty} key={p.id} currentUser={auth.uid}/>
												)
										})
									}
								</div>


								<div className="checkout-cart">
									<div>
										<h1>Order Summary</h1>
										<div className="subtotal-container">
											<p className="subtotal">Total: ({tempCart.length} product/s)</p>
											<span>₱{numberWithCommas(subtotal)}</span>
										</div>
										
									</div>


									
									<div>
										{
											this.state.clicked? 
											<Button fluid disabled>Processing...</Button>
											:
											<Button fluid style={loginBtn} onClick={this.handleCheckout}>Checkout</Button>
											
										}
									</div>
									
								</div>
							</div>

							:

							<div className="cart-no-products">
								<h1>Cart</h1>
								<div className="cart-svg">
									<img src={RelaxingSVG} alt="svgfile"/>
									<p>There are no products in your cart.</p>
								</div>
							</div>
						}
					</div>
                
                </div>
                <Footer />

                <Confirm open={this.state.open} onCancel={this.close} content='[DEMO] Your cart has been processed for orders. Thanks!' onConfirm={this.close} />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const cart = users ? users[id].cart : null 

    return { 
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        products: state.firestore.ordered.products,
        cart,
        id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		checkout: (state) => dispatch(checkout(state))
    }
} 

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(['users', 'products'])
)(Cart)
