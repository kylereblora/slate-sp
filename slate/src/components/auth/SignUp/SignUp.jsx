import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import './signup.css'

export class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);
    }


    render() {
        return (
            <div className="signup">
                <div className="signup-main">
                    <div className="signup-card">
                        <div className="brand-color" />

                        <div className="signup-form">
                            <h1 className="signup-logo"><a href="/">slate</a></h1>
                            <h1 className="create-your-acc">Create your account</h1>
                            <Form  onSubmit={this.handleSubmit}>
                                <Form.Field required onChange={this.handleChange}>
                                    <input id="firstName" placeholder='First Name' />
                                </Form.Field>
                                <Form.Field required onChange={this.handleChange}>
                                    <input id="lastName" placeholder='Last Name' />
                                </Form.Field>
                                <Form.Field required onChange={this.handleChange}>
                                    <input type="email" id="email" placeholder='Email' />
                                </Form.Field>
                                <Form.Field required onChange={this.handleChange}>
                                    <input type="password" id="password" placeholder='Password' />
                                </Form.Field>

                                <div className="form-buttons">
                                    <div className="login-instead">
                                        <a href="/signin">Log in instead</a>
                                    </div>

                                    <div className="submit-btn">
                                        <Button inverted color="orange" type='submit'>Sign Up</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default SignUp
