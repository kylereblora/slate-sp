import React, { Component } from 'react'
import Navbar from '../../../client/Navbar/Navbar';
import { Button, Form, TextArea, Label, Input, Dropdown } from 'semantic-ui-react'
import './createitem.css';
import { createProduct } from '../../../../store/actions/productActions'
import { connect } from 'react-redux'
import ItemUpload from './ItemUpload';
import { Redirect } from 'react-router-dom'
import { options } from '../../Items/CreateItem/itemoptions'


export class CreateItem extends Component {
    state = {
        itemName:           '',
        itemPrice:          '',
        itemQuantity:       '',
        itemDescription:    '',
        itemCategory:       '',
        itemImageUrl:       '',
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
        // calls the dispatch to create a product using the state that we have right now
        if((this.state.itemName || this.state.itemPrice || this.state.itemQuantity || this.state.itemDescription
        || this.state.itemCategory || this.state.itemImageUrl) !== '') {
            
            this.props.createProduct(this.state).then(() => {
                this.setState({
                    itemName:           '',
                    itemPrice:          '',
                    itemQuantity:       '',
                    itemDescription:    '',
                    itemCategory:       '',
                    itemImageUrl:       '',
                });

                window.location.reload();
            })
        } 
    }

    imageUrlCallback = (data) => {
        // gets the image url from the ItemUpload child for later use
        this.setState({itemImageUrl : data})        
    }

    render() {
        const { auth } = this.props;

        // ROUTE GUARD -- if the user isn't logged in yet and tries to access this component, redirect.
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="create-item-site">
                <Navbar />
                <div className="create-item-main">
                    <div className="create-item-form">
                        <h1>Add Item</h1>
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Name</label>
                                <Input id="itemName" placeholder='Soft Faux Leather Chair' />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Price</label>
                            
                                <Input id="itemPrice" labelPosition='right' type='number' min='1' placeholder='450'>
                                    <input />
                                    <Label>.00</Label>
                                </Input>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Quantity</label>
                            
                                <Input type="number" id="itemQuantity" min='1' placeholder='20' />
                                
                            </Form.Field>
                            
                            <Form.Field required>
                                <label>Item Category</label>
                                <Dropdown placeholder='Bath' name='itemCategory' clearable options={options} onChange={this.handleDropdownChange} selection />
                                
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Item Description</label>
                                <TextArea id="itemDescription" placeholder='Describe this item!' />
                            </Form.Field>

                            <Form.Field required>
                                <label>Item Image</label>
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} />
                            </Form.Field>

                            
                            <div className="form-buttons">
                                <Button fluid color="orange" type='submit' onClick={this.handleSubmit}>Add Item</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (product) => dispatch(createProduct(product))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem)
