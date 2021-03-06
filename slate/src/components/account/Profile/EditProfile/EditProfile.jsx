import React, { Component } from 'react'
import { Button, Form, TextArea, Input, Dropdown, Modal, Icon } from 'semantic-ui-react'
import { provinces } from './provinces'
import ItemUpload from '../../../admin/Items/CreateItem/ItemUpload'
import { editUser } from '../../../../store/actions/authActions'
import { connect } from 'react-redux'
import { loginBtn, disabledLoginBtn } from '../../../../assets/styles/styles'
import './editprofile.css'

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
            [name] : value
        })
    }


    handleSubmit = (e) => {
        if((this.state.firstName && this.state.lastName && this.state.province && this.state.contactNumber
            && this.state.proDescription) !== '') {

            this.setState({clicked: true}, () => {
                const sub = {
                    ...this.props.user,
                    id: this.props.id
                }

                
                this.props.editUser(sub, this.state).then(() => {
                    this.setState({
                        clicked: false,
                    }) 
                })
            })
                
        }
        
    }

    imageUrlCallback = (data) => {
        // gets the image url from the ItemUpload child for later use
        this.setState({proImageUrl : data})        
    }

    render() {
        return (
            <Modal 
                trigger={<Button style={loginBtn} size='small'  onClick={this.handleOpen}><Icon name='pencil alternate' />Edit Profile</Button>} 
                
                closeIcon
            >
                <Modal.Header><h1>Edit Profile</h1></Modal.Header>
                <Modal.Content>
                    <div className="edit-item-form">
                        
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>First Name</label>
                                <Input id="firstName" type='text' value={this.state.firstName}/>
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Last Name</label>
                                <Input id="lastName" type='text' value={this.state.lastName}/>
                            </Form.Field>

                            
                            <Form.Field required>
                                <label>Province</label>
                                <Dropdown value={this.state.province} name='province' clearable options={provinces} onChange={this.handleDropdownChange} search selection />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Contact Number</label>
                                <Input id="contactNumber" type='text' value={this.state.contactNumber} />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Description</label>
                                <TextArea id="proDescription" value={this.state.proDescription} style={{ minHeight: 150 }}/>
                            </Form.Field>

                            <Form.Field required>
                                <label>Profile Image</label>
                                <p>Image must be a square (e.g. 150x150)</p>
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} store={'users'} />
                            </Form.Field>

                            <div className="edit-form-buttons">
                                {
                                    (this.state.firstName && this.state.lastName && this.state.province && this.state.contactNumber
                                        && this.state.proDescription) === '' ?
                                        
                                        <Button fluid style={disabledLoginBtn}>Edit Profile</Button>
                                        :

                                        <div className="edit-form-buttons">
                                            {
                                                this.state.clicked ?
                                                <Button fluid loading>Editing item...</Button>
                                                :
                                                <Button fluid style={loginBtn} type='submit' onClick={this.handleSubmit}>Edit Profile</Button>
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
        editUser : (user, state) => dispatch(editUser(user, state))
    }
} 

export default connect(null, mapDispatchToProps)(EditProfile)
