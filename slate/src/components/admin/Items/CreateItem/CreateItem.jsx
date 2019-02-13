import React, { Component } from 'react'
import Navbar from '../../../client/Navbar/Navbar';
import Footer from '../../../client/Footer/Footer';
import { Button, Form, TextArea, Label, Input, Dropdown } from 'semantic-ui-react'
import './createitem.css';

const options = [
    {key: 1, text: 'Bath', value: 'Bath'},
    {key: 2, text: 'Curtains and Blinds', value: 'Curtains and Blinds'},
    {key: 3, text: 'Home Interior', value: 'Home Interior'},
    {key: 4, text: 'Lightings and Fans', value: 'Lightings and Fans'},
    {key: 5, text: 'Walls and Flooring', value: 'Walls and Flooring'},
    
]

export class CreateItem extends Component {
    state = {
        itemName:           '',
        itemPrice:          '',
        itemQuantity:       '',
        itemDescription:    '',
        itemCategory:       '',
        itemImage:          '',
    }
    
    handleChange = (e) => {
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
        e.preventDefault();

        console.log(this.state);
    }

    render() {
        return (
            <div className="create-item-site">
                <Navbar />
                <div className="create-item-main">
                    <div className="create-item-form">
                        <h1>Add Item</h1>
                        <Form  onSubmit={this.handleSubmit}>
                            <Form.Field required onChange={this.handleChange}>
                                <h3>Item Name</h3>
                                <Input id="itemName" placeholder='Soft Faux Leather Chair' />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <h3>Item Price</h3>
                            
                                <Input id="itemPrice" labelPosition='right' type='text' placeholder='450'>
                                    <input />
                                    <Label>.00</Label>
                                </Input>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <h3>Item Quantity</h3>
                            
                                <Input type="number" id="itemQuantity" placeholder='20' />
                                
                            </Form.Field>
                            
                            <Form.Field required>
                                <h3>Item Category</h3>
                                <Dropdown placeholder='Bath' name='itemCategory' clearable options={options} onChange={this.handleDropdownChange} selection />
                                
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <h3>Item Description</h3>
                                <TextArea id="itemDescription" placeholder='Describe this item!' />
                            </Form.Field>
                            

                            <div className="form-buttons">
                                <Button fluid inverted color="orange" type='submit' onClick={this.handleClick}>Add Item</Button>
                            </div>
                            
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateItem
