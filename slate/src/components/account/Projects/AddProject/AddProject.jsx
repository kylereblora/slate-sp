import React, { Component } from 'react'
import { Form, Button, Input, Label, TextArea, Dropdown } from 'semantic-ui-react'
import Navbar from '../../../client/Navbar/Navbar';
import Footer from '../../../client/Footer/Footer';
import './addproject.css';
import { years } from './years';

export class AddProject extends Component {
    state = {
        projectName : '',
        projectCost : '',
        projectLocation : '',
        projectYear : '',
        projectDescription : '',
        
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
        console.log(this.state);
        
    }

    render() {
        return (
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
                                    
                                        <Input id="projectCost" labelPosition='right' type='number' min='1'>
                                            <input />
                                            <Label>.00</Label>
                                        </Input>
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

                                    
                                    <div className="form-buttons">
                                        <Button fluid color="orange" type='submit' onClick={this.handleSubmit}>Add Project</Button>
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
        )
    }
}

export default AddProject
