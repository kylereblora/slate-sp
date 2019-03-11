import React, { Component } from 'react'
import { Button, Form, TextArea, Label, Input, Dropdown, Modal } from 'semantic-ui-react'
import { options } from '../Items/CreateItem/itemoptions'
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

    imageUrlCallback = (data) => {
        // gets the image url from the ItemUpload child for later use
        this.setState({itemImageUrl : data})        
    }

    render() {
        return (
            <Modal trigger={<Button icon='edit' color='yellow' />}>
                <Modal.Content>
                    <div className="edit-item-form">
                        <h1>Edit Item</h1>
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Name</label>
                                <Input id="itemName" value={this.state.itemName}/>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Price</label>
                            
                                <Input id="itemPrice" labelPosition='right' type='number' min='1' value={this.state.itemPrice}>
                                    <input />
                                    <Label>.00</Label>
                                </Input>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Quantity</label>
                            
                                <Input type="number" id="itemQuantity" min='1' value={this.state.itemQuantity} />
                                
                            </Form.Field>
                            
                            <Form.Field required>
                                <label>Item Category</label>
                                <Dropdown value={this.state.itemCategory} name='itemCategory' clearable options={options} onChange={this.handleDropdownChange} selection />
                                
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Description</label>
                                <TextArea id="itemDescription" value={this.state.itemDescription} />
                            </Form.Field>

                            <Form.Field required>
                                <label>Item Image</label>
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} store={'items'} />
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
