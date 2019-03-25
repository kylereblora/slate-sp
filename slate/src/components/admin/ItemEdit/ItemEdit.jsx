import React, { Component } from 'react'
import { Button, Form, TextArea, Label, Input, Dropdown, Modal } from 'semantic-ui-react'
import { options } from '../Items/CreateItem/itemoptions'
import ItemUpload from '../Items/CreateItem/ItemUpload'
import { editProduct } from '../../../store/actions/productActions'
import { connect } from 'react-redux'
import { disabledLoginBtn, signUpBtn } from '../../../assets/styles/styles';
import './itemedit.css'


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
            modalOpen:          false,
            clicked :           false,
        }
    }


    handleChange = (e) => {
        // changes the value of the state based on the value and the id
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleOpen = () => {
        this.setState({modalOpen: true})
    }

    handleDropdownChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        if((this.state.itemName && this.state.itemPrice && this.state.itemQuantity && this.state.itemDescription
            && this.state.itemCategory && this.state.itemImageUrl) !== '') {
            this.setState({clicked: true}, () => {
                this.props.editProduct(this.props.product, this.state).then(() => {
                    this.setState({
                        modalOpen: false,
                        clicked: false,
                    })
                })
            })
        }
    }

    imageUrlCallback = (data) => {
        // gets the image url from the ItemUpload child for later use
        this.setState({itemImageUrl : data})        
    }

    render() {
        return (
            <Modal 
                trigger={<Button icon='edit' color='yellow' onClick={this.handleOpen}/>}
                open={this.state.modalOpen}
            >
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

                            
                            <div className="edit-form-buttons">
                                {
                                    (this.state.itemName && this.state.itemPrice && this.state.itemQuantity && this.state.itemDescription
                                        && this.state.itemCategory && this.state.itemImageUrl) === '' ?


                                        <Button fluid style={disabledLoginBtn}>Edit Item</Button>
                                        :
                                        <div className="edit-form-buttons">
                                            {
                                                this.state.clicked ?
                                                <Button fluid loading>Editing item...</Button>
                                                :
                                                <Button fluid style={signUpBtn} type='submit' onClick={this.handleSubmit}>Edit Item</Button>
                                            }
                                        </div>
                                }

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
