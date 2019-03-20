import React, { Component } from 'react'
import { Button, Form, TextArea, Label, Input, Dropdown, Modal, Icon } from 'semantic-ui-react'
import { provinces } from './provinces'
import ItemUpload from '../../../admin/Items/CreateItem/ItemUpload'
import { editUser } from '../../../../store/actions/authActions'
import { connect } from 'react-redux'

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName : this.props.user.firstName,
            lastName : this.props.user.lastName,
            province : this.props.user.province,
            contactNumber : this.props.user.contactNumber,
            proDescription: this.props.user.proDescription,
            proImageUrl: this.props.user.proImageUrl,
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
            [name] : value
        })
    }


    handleSubmit = (e) => {
        console.log(this.state);
        
        const sub = {
            ...this.props.user,
            id: this.props.id
        }
        this.props.editUser(sub, this.state)
    }

    imageUrlCallback = (data) => {
        // gets the image url from the ItemUpload child for later use
        this.setState({proImageUrl : data})        
    }

    render() {
        return (
            <Modal trigger={<Button inverted color='orange' size='small'><Icon name='pencil alternate' />Edit Profile</Button>} closeIcon>
                <Modal.Content>
                    <div className="edit-item-form">
                        <h1>Edit Profile</h1>
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>First Name</label>
                                <Input id="firstName" value={this.state.firstName}/>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Last Name</label>
                                <Input id="lastName" value={this.state.lastName}/>
                            </Form.Field>

                            
                            <Form.Field required>
                                <label>Province</label>
                                <Dropdown value={this.state.province} name='province' clearable options={provinces} onChange={this.handleDropdownChange} search selection />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Contact Number</label>
                                <Input id="contactNumber" value={this.state.contactNumber}/>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Description</label>
                                <TextArea id="proDescription" value={this.state.proDescription} />
                            </Form.Field>

                            <Form.Field required>
                                <label>Profile Image</label>
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} store={'users'} />
                            </Form.Field>

                            <div className="form-buttons">
                                <Button fluid color="orange" type='submit' onClick={this.handleSubmit}>Edit Profile</Button>
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
        editUser : (user, state) => dispatch(editUser(user, state))
    }
} 

export default connect(null, mapDispatchToProps)(EditProfile)
