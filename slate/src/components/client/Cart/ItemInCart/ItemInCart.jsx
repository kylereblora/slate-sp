import React, { Component } from 'react'
import './itemincart.css'
import { Link } from 'react-router-dom'
import { Button, Rating } from 'semantic-ui-react'
import { deleteItemFromCart } from '../../../../store/actions/cartActions'
import { connect } from 'react-redux'

export class ItemInCart extends Component {

    handleDelete = (e, product) => {
        this.props.deleteItemFromCart(product.id, this.props.currentUser);
        
    }

    render() {
        const { product } = this.props;
        return (
            <div className="item-preview">
                <div className="responsive-container-cart">
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
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemFromCart: (id, product, state) => dispatch(deleteItemFromCart(id, product, state)),
    }
} 

export default connect(null, mapDispatchToProps)(ItemInCart)
