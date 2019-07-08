import React, { Component } from 'react'
import './itemincart.css'
import { Link } from 'react-router-dom'
import { Button, Rating } from 'semantic-ui-react'
import { deleteItemFromCart, editItemQuantityInCart } from '../../../../store/actions/cartActions'
import { connect } from 'react-redux'

export class ItemInCart extends Component {
    state = {
        itemQty: this.props.qty,
    }

    truncateText = (s) => {
        if (s.length > 35) return s.substring(0,35) + '...';
        else return s;
    }

    handleDelete = (e, product) => {
        this.props.deleteItemFromCart(product.id, this.props.qty,this.props.currentUser);
    }

    handleChangeItemQty = (e) => {
        if(parseInt(e.target.value, 10) <= parseInt(this.props.product.itemQuantity, 10)) {
            this.setState({itemQty:e.target.value}, () => {
                this.props.editItemQuantityInCart(this.props.product.id, this.props.currentUser, this.state.itemQty)
            });
        } else {
            this.setState({itemQty:this.props.product.itemQuantity}, () => {
                this.props.editItemQuantityInCart(this.props.product.id, this.props.currentUser, this.state.itemQty)
            })
        }
        
    }

    render() {
        const { product, qty } = this.props;
        return (
            <div className="item-preview">
                <div className="responsive-container-cart">
                    <div className="dummy"></div>
                    <div className="item-picture-preview">
                        <img src={product.itemImageUrl} alt={product.itemName}/>
                    </div>
                </div>
                

                <div className="item-misc-preview">
                    <Link className='item-link-style' to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                        <p className="item-name-preview">{this.truncateText(product.itemName)}</p>
                        <p className="item-price-preview">{product.itemCategory}</p>
                        <p className="item-price-preview">&#8369;{product.itemPrice}</p>
                        <Rating icon="star" defaultRating = {product.itemRating} maxRating = {5} disabled/>
                    </Link>
                </div>


                <div className="quantity-dropdown-cart">
                    <label htmlFor="input">Qty: </label>
                    <input onChange={this.handleChangeItemQty} type="number"  defaultValue={qty || '1'} min='1' max={product.itemQuantity} placeholder='1'/>
                </div>

                
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
        editItemQuantityInCart: (productId, user, qty) => dispatch(editItemQuantityInCart(productId, user, qty)),
    }
} 

export default connect(null, mapDispatchToProps)(ItemInCart)
