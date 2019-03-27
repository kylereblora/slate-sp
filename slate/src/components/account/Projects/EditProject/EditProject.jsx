import React, { Component } from 'react'
import { defaultBtn, loginBtn, disabledLoginBtn } from '../../../../assets/styles/styles';
import { Button, Modal, Icon, Form, Input, Dropdown, TextArea } from 'semantic-ui-react'
import './editproject.css'
import ItemUpload from '../../../admin/Items/CreateItem/ItemUpload'
import { years } from '../AddProject/years';
import { costs } from '../AddProject/costs';
import { editProject } from '../../../../store/actions/projectActions'
import { connect } from 'react-redux'

export class EditProject extends Component {
    state = {
        projectName: this.props.project.projectName,
        projectCost: this.props.project.projectCost,
        projectLocation: this.props.project.projectLocation,
        projectYear: this.props.project.projectYear,
        projectDescription: this.props.project.projectDescription,
        projectImageUrl : this.props.project.projectImageUrl,
        clicked :           false,
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

    handleOpen = () => {
        this.setState({modalOpen: true})
    }
    
    handleSubmit = (e) => {

        if((this.state.projectName && this.state.projectCost && this.state.projectLocation && this.state.projectYear
        && this.state.projectDescription && this.state.projectImageUrl) !== '') {
            
            this.setState({clicked: true}, () => {
                
                this.props.editProject(this.props.project, this.state, this.props.id).then(() => {
                    this.setState({
                        clicked: false,
                    }) 
                })
            })
        }
    }

    render() {
        return (
            <Modal
                trigger={<Button style={defaultBtn} onClick={this.handleOpen}><Icon name='pencil alternate' />Edit Project</Button>}
                size='small'
            >
                <Modal.Content>
                    <div className="edit-project-form">
                        <h1 className='edit-project-header'>Edit Project</h1>
                        <p className="add-project-desc">Showcase your skills by filling out the details of your project below.  </p>
                        <Form>
                            <Form.Field required onChange={this.handleChange}>
                                <label>Project Name</label>
                                <Input id="projectName" value={this.state.projectName} />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Project Cost</label>
                            
                                <Dropdown placeholder={this.state.projectCost} name='projectCost' options={costs} onChange={this.handleDropdownChange} selection />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Project Location</label>
                            
                                <Input id="projectLocation" value={this.state.projectLocation} />
                            </Form.Field>
                            
                            <Form.Field required onChange={this.handleChange}>
                                <label>Project Year</label>
                            
                                <Dropdown placeholder={this.state.projectYear} name='projectYear' options={years} onChange={this.handleDropdownChange} selection />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Project Description</label>
                                <TextArea id="projectDescription" value={this.state.projectDescription} />
                            </Form.Field>

                            <Form.Field required>
                                <label>Project Image Cover</label>
                                <p>This will be used as your project's cover photo.</p>
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} store={'projects'}/>
                            </Form.Field>

                            <div className="edit-form-buttons">
                                {
                                    (this.state.projectName && this.state.projectCost && this.state.projectLocation && this.state.projectYear
                                        && this.state.projectDescription && this.state.projectImageUrl) === '' ?

                                        <Button fluid style={disabledLoginBtn}>Edit Project</Button>
                                        :
                                        <div className="edit-form-buttons">
                                            {
                                                this.state.clicked ?
                                                <Button fluid loading>Editing item...</Button>
                                                :
                                                <Button fluid style={loginBtn} type='submit' onClick={this.handleSubmit}>Edit Project</Button>
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
        editProject: (project, state, id) => dispatch(editProject(project, state, id))
    }
} 

export default connect(null, mapDispatchToProps)(EditProject)
