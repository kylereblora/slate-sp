import React, { Component } from 'react'
import { Button, Form, Dropdown, Checkbox, Message } from 'semantic-ui-react'
import './signup.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../../store/actions/authActions'
import { signUpBtn, disabledLoginBtn } from '../../../assets/styles/styles';

const options = [
    {key: 1, text: 'Architect', value: 'Architect'},
    {key: 2, text: 'Interior Designer', value: 'Interior Designer'},
]

export class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        occupation: 'Regular',
        email: '',
        password: '',
        checked: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if((this.state.firstName && this.state.lastName && this.state.email && this.state.password) !== '') {
            this.props.signUp(this.state);
        }
        
    }

    toggle = (e) => {
        this.setState({ checked : !this.state.checked }, () => {
            if(this.state.checked === false) {
                this.setState({occupation:'Regular'});
            }
        })
    }

    handleDropdownChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }


    render() {
        const { auth, authError } = this.props;

        // ROUTE GUARD -- if the user isn't logged in yet and tries to access this component, redirect.
        if (auth.uid) return <Redirect to='/home' />
        return (
            <div className="signup">
                <div className="signup-main">
                    <div className="signup-card">
                        <div className="brand-color" />

                        <div>
                            <h1 className="signup-logo"><a href="/">slate</a></h1>
                            <h1 className="create-your-acc">Create your account</h1>
                            <div className="signup-form">
                                <Form onSubmit={this.handleSubmit}>
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

                                    <Form.Field onChange={this.handleChange}>
                                        <Checkbox label='Registering as a pro?' toggle onChange={this.toggle} checked={this.state.checked} />
                                    </Form.Field>

                                    {
                                        this.state.checked === true ? 

                                        <Form.Field required>
                                            <label>Category</label>
                                            <Dropdown placeholder='Architect' name='occupation' clearable options={options} onChange={this.handleDropdownChange} selection />
                                            
                                        </Form.Field>

                                        : null
                                    }

                                    <div className="form-buttons">
                                        <div className="submit-btn">
                                            {
                                                (this.state.firstName && this.state.lastName && this.state.email && this.state.password) === '' ?
                                                <Button style={disabledLoginBtn}>Sign Up</Button>
                                                :
                                                <Button style={signUpBtn} type='submit'>Sign Up</Button>
                                            }


                                        </div>

                                        <div className="login-instead">
                                            <a href="/signin">Log in instead</a>
                                        </div>
                                    </div>

                                    <div className="message-negative">
                                        { 
                                            authError ? 
                                            <Message negative>
                                                <Message.Header>Oof. Sign Up failed.</Message.Header>
                                                <p>{ authError }</p>
                                            </Message>
                                            : null
                                        }
                                    </div>
                                </Form>
                            </div>
                            
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
