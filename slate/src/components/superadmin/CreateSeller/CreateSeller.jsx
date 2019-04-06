import React, { Component } from 'react'
import { Button, Modal, Icon, Form, Input, Dropdown, TextArea } from 'semantic-ui-react'
import  { defaultBrandBtn, disabledLoginBtn, loginBtn }  from '../../../assets/styles/styles';
import './createseller.css'
import axios from 'axios'

export class CreateSeller extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        clicked : false,
        
    }

	resetComponent = () => this.setState({ clicked: false, firstName: '', lastName: '', email: '', password: '' })

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleOpen = () => {
        this.setState({modalOpen: true})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if ((this.state.firstName && this.state.lastName && this.state.email && this.state.password) !== '') {
            this.setState({clicked: true}, () => {
                axios.post('https://us-central1-slate-sp2.cloudfunctions.net/createSeller', {
                    seller: this.state
                }).then(() => {
                    this.resetComponent()
                })
            })
        }
    }

    render() {
        return (
            <Modal
                trigger={<Button style={defaultBrandBtn} onClick={this.handleOpen}><Icon name='add' />Create a Seller</Button>}
                size='small'
            >
                <Modal.Content>
                    <div className="create-seller-form">
                        <h1 className='edit-project-header'>Add a Seller to Slate</h1>
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>First Name</label>
                                <input id="firstName" placeholder='First Name' />
                            </Form.Field>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Last Name</label>
                                <input id="lastName" placeholder='Last Name' />
                            </Form.Field>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Email</label>
                                <input type="email" id="email" placeholder='Email' />
                            </Form.Field>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Password</label>
                                <input type="password" id="password" placeholder='Password' />
                            </Form.Field>

                            <div className="create-seller-form-buttons">
                                {
                                    (this.state.firstName && this.state.lastName && this.state.email && this.state.password) === '' ?

                                        <Button fluid style={disabledLoginBtn}>Add Seller</Button>
                                        :
                                        <div className="create-seller-form-buttons">
                                            {
                                                this.state.clicked ?
                                                <Button fluid loading>Creating seller...</Button>
                                                :
                                                <Button fluid style={loginBtn} type='submit' onClick={this.handleSubmit}>Add Seller</Button>
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

export default CreateSeller
