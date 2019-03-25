import React, { Component } from 'react'
import './itempreviews.css'
import { Button, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { deleteProduct } from '../../../store/actions/productActions'
import { connect } from 'react-redux'
import EditItem from '../ItemEdit/ItemEdit'


export class ItemPreviews extends Component {
    handleDelete = (e, product) => {
        this.props.deleteProduct(product)
    }

    render() {
        const { product } = this.props;
        return (
            <div className="item-preview">
                <div className="responsive-container-preview">
                    <div className="dummy"></div>
                    
                    <div className="item-picture-preview-preview">
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
                    <EditItem product = {product} />
                    <Button icon='close' color='red' onClick={(e) => this.handleDelete(e, product)}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (product) => dispatch(deleteProduct(product)),
    }
} 

export default connect(null, mapDispatchToProps)(ItemPreviews)
