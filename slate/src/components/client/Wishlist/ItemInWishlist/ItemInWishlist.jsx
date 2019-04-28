import React, { Component } from 'react'
import './iteminwishlist.css'
import { Link } from 'react-router-dom'
import { Button, Rating } from 'semantic-ui-react'
import { deleteItemFromWishlist } from '../../../../store/actions/wishlistActions'
import { addItemToCart } from '../../../../store/actions/cartActions'
import { connect } from 'react-redux'
import { getProductFromWishlist } from '../wishlistFunctions'

export class ItemInWishlist extends Component {
    state = {
        addedToCart: false,
    }

    handleDelete = (e, product) => {
        this.props.deleteItemFromWishlist(product.id, product, this.props.currentUser);
        
    }

    handleAddToCart = (e, productId) => {
        this.props.addItemToCart(productId, this.props.currentUser).then(() => {
            this.setState({addedToCart: true})
        })
    }

    render() {
        const { product, cart } = this.props;
        let inCart = null;

        if (cart) {
            inCart = cart.find(getProductFromWishlist(product.id));
           
            
        }

        return (
            <div className="item-preview">
                <div className="responsive-container-wishlist">
                    <div className="dummy"></div>
                    <div className="item-picture-preview">
                        <img src={product.itemImageUrl} alt={product.itemName}/>
                    </div>
                </div>
                
                <div className="spacer" />

                <div className="item-misc-preview">
                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                        <p className="item-name-preview">{product.itemName}</p>
                        <p className="item-price-preview">{product.itemCategory}</p>
                        <p className="item-price-preview">&#8369;{product.itemPrice}</p>
                        <Rating icon="star" defaultRating = {product.itemRating} maxRating = {5} disabled/>
                    </Link>
                </div>

                <div className="spacer" />
                
                <div className="action-buttons">
                    <Button basic icon='trash alternate' color='red' onClick={(e) => this.handleDelete(e, product)}/>
                    {
                        this.state.addedToCart || inCart ? 
                        <Button basic icon='cart' disabled secondary/>
                        :
                        <Button basic icon='cart' color='green' onClick={(e) => this.handleAddToCart(e, product.id)} />
                    }
                    
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemFromWishlist: (id, product, state) => dispatch(deleteItemFromWishlist(id, product, state)),
        addItemToCart: (id, state) => dispatch(addItemToCart(id, state))
    }
} 

export default connect(null, mapDispatchToProps)(ItemInWishlist)
