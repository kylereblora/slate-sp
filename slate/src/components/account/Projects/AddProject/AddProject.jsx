import React, { Component } from 'react'
import { Form, Button, Input, Label, TextArea, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import Navbar from '../../../client/Navbar/Navbar';
import Footer from '../../../client/Footer/Footer';
import './addproject.css';
import { years } from './years';
import { costs } from './costs';
import { connect } from 'react-redux'
import { createProject } from '../../../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import ItemUpload from '../../../admin/Items/CreateItem/ItemUpload'
import { loginBtn } from '../../../../assets/styles/styles'

export class AddProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectName : '',
            projectCost : '',
            projectLocation : '',
            projectYear : '',
            projectDescription : '',
            projectImageUrl : '',
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

    imageUrlCallback = (data) => {
        // gets the image url from the ItemUpload child for later use
        this.setState({projectImageUrl : data})        
    }

    handleSubmit = (e) => {

        if((this.state.projectName && this.state.projectCost && this.state.projectLocation && this.state.projectYear
        && this.state.projectDescription && this.state.projectImageUrl) !== '') {
            
            this.props.createProject(this.state, this.props.auth.uid).then(() => {
                window.location.href = '/profile/'+this.props.auth.uid;
            })
        } else {
            console.log("bro");
            
        }
    }

    

    render() {
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div>
                {
                    auth ?

                    <div className='add-project-site'>
                        <Navbar />

                        <div className="add-project-main">
                            <div className="add-project-content">
                                <div className="add-project-grid-container">
                                    <div className="add-project-form">
                                        <h1>Add Project</h1>
                                        <p className="add-project-desc">Showcase your skills by filling out the details of your project below.  </p>
                                        <Form>
                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Name</label>
                                                <Input id="projectName" placeholder='Three-Storey Contemporary House' />
                                            </Form.Field>

                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Cost</label>
                                            
                                                <Dropdown placeholder='Less than ₱50,000' name='projectCost' options={costs} onChange={this.handleDropdownChange} selection />
                                            </Form.Field>

                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Location</label>
                                            
                                                <Input id="projectLocation" />
                                            </Form.Field>
                                            
                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Year</label>
                                            
                                                <Dropdown placeholder='2019' name='projectYear' options={years} onChange={this.handleDropdownChange} selection />
                                            </Form.Field>

                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Description</label>
                                                <TextArea id="projectDescription" placeholder='Describe this project!' />
                                            </Form.Field>

                                            <Form.Field required>
                                                <label>Project Image Cover</label>
                                                <p>This will be used as your project's cover photo.</p>
                                                <ItemUpload callbackFromParent = {this.imageUrlCallback} store={'projects'}/>
                                            </Form.Field>

                                            
                                            <div className="form-buttons">
                                                <Button fluid style={loginBtn} type='submit' onClick={this.handleSubmit}>Add Project</Button>
                                            </div>
                                        </Form>
                                    </div>

                                    <div className="add-project-guidelines">
                                        <h2>guidelines</h2>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <Footer />
                    </div>

                    : 

                    <div>
                        <Dimmer active inverted>
                            <Loader inverted></Loader>
                        </Dimmer>
                    </div>
                }
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
        createProject: (project, state) => dispatch(createProject(project, state))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
