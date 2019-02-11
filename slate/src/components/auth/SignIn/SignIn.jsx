import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import './signin.css'


export class SignIn extends Component {
    state = {
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
            <div className="signin-main">
                <div className="sg">
                    <h1 className="signin-logo"><a href="/">slate</a></h1>
                    <div className="signin-card">
                        <div className="signin-form">
                            <h1 className="create-your-acc">Log in</h1>
                            <Form  onSubmit={this.handleSubmit}>
                                <Form.Field required onChange={this.handleChange}>
                                    <input type="email" id="email" placeholder='Email' />
                                </Form.Field>
                                <Form.Field required onChange={this.handleChange}>
                                    <input type="password" id="password" placeholder='Password' />
                                </Form.Field>

                                <div className="form-buttons">
                                    <div className="login-instead">
                                        <a href="/register">Create account</a>
                                    </div>

                                    <div className="submit-btn">
                                        <Button inverted color="orange" type='submit'>Log in</Button>
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

export default SignIn
