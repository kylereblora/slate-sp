import React, { Component } from 'react'
import { Button, Form, TextArea, Label, Input, Dropdown, Modal } from 'semantic-ui-react'
import { options } from '../Items/CreateItem//itemoptions'
import ItemUpload from '../Items/CreateItem/ItemUpload'
import { editProduct } from '../../../store/actions/productActions'
import { connect } from 'react-redux'

export class ItemEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName:           this.props.product.itemName,
            itemPrice:          this.props.product.itemPrice,
            itemQuantity:       this.props.product.itemQuantity,
            itemDescription:    this.props.product.itemDescription,
            itemCategory:       this.props.product.itemCategory,
            itemImageUrl:       this.props.product.itemImageUrl,
        }
    }


    handleChange = (e) => {
        // changes the value of the state based on the value and the id
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleDropdownChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        this.props.editProduct(this.props.product, this.state)
    }

    render() {
        return (
            <Modal trigger={<Button icon='edit' color='yellow' />}>
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                    <div className="edit-item-form">
                        <h1>Edit Item</h1>
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Name</label>
                                <Input id="itemName" placeholder={this.props.product.itemName}/>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Price</label>
                            
                                <Input id="itemPrice" labelPosition='right' type='number' min='1' placeholder={this.props.product.itemPrice}>
                                    <input />
                                    <Label>.00</Label>
                                </Input>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Quantity</label>
                            
                                <Input type="number" id="itemQuantity" min='1' placeholder={this.props.product.itemQuantity} />
                                
                            </Form.Field>
                            
                            <Form.Field required>
                                <label>Item Category</label>
                                <Dropdown placeholder={this.props.product.itemCategory} name='itemCategory' clearable options={options} onChange={this.handleDropdownChange} selection />
                                
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Description</label>
                                <TextArea id="itemDescription" placeholder={this.props.product.itemDescription} />
                            </Form.Field>

                            <Form.Field required>
                                <label>Item Image</label>
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} />
                            </Form.Field>

                            
                            <div className="form-buttons">
                                <Button fluid color="orange" type='submit' onClick={this.handleSubmit}>Edit Item</Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProduct : (product, state) => dispatch(editProduct(product, state))
    }
} 

export default connect(null, mapDispatchToProps)(ItemEdit) 
