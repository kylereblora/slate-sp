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
        projectImagesArray: this.props.project.projectImagesArray,
        clicked : false,
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

    projectImagesUrlCallback = (data) => {
        const { projectImagesArray } = this.state;

        let arr = projectImagesArray.slice();

        if(arr.length < 5) arr.push(data);
        else if (arr.length === 5) alert('You have exceeded the maximum number of photos allowed. If you wish to edit specific photos, upload ')

        this.setState({projectImagesArray : arr});
    }

    handleDeleteProjectImage = (e, index) => {
        const { projectImagesArray } = this.state;
 
        let arr = projectImagesArray.slice();
        arr.splice(index, 1)

        console.log(arr);
        
        this.setState({projectImagesArray : arr});
    }

    handleDeleteProjectBanner = () => {
        this.setState({projectImageUrl: ''})
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
        const { projectImagesArray } = this.state; 
        let newProjectImagesArray = ['0', '0', '0', '0', '0']

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
                                <Input id="projectName" type='text' value={this.state.projectName} />
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
                            
                                <Dropdown value={this.state.projectYear} name='projectYear' options={years} onChange={this.handleDropdownChange} selection />
                            </Form.Field>

                            <Form.Field required onChange={this.handleChange}>
                                <label>Project Description</label>
                                <TextArea id="projectDescription" value={this.state.projectDescription} />
                            </Form.Field>

                            <Form.Field required>
                                <label>Project Image Cover</label>
                                <p>This will be used as your project's cover photo.</p>
                                {
                                    this.state.projectImageUrl !== '' ?
                                    <div className="edit-project-images-preview">
                                        <div className="edit-project-image">
                                            <span className='delete-project-image'><Button floated="right" icon='close' onClick={() => this.handleDeleteProjectBanner()} size='mini'/></span>
                                            <img src={this.state.projectImageUrl} alt="projectimage"/>
                                        </div>
                                    </div>

                                    :
                                    null
                                }
                                <ItemUpload callbackFromParent = {this.imageUrlCallback} store={'projects'}/>
                            </Form.Field>

                            <Form.Field required>
                                <label>Project Images</label>
                                <p>You can upload up to five images of your project.</p>
                                <div className="edit-project-images-preview">
                                    {
                                        projectImagesArray.map((projectimage, index) => {
                                            return (
                                                <div className="edit-project-image" key={index}>
                                                    <span className='delete-project-image'><Button floated="right" icon='close' onClick={(e) => this.handleDeleteProjectImage(e, index)} size='mini'/></span>
                                                    <img src={projectimage} alt="projectimage"/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                {
                                    newProjectImagesArray.slice(0, 5).map((element, index) => {
                                        return (
                                            <div key={index}>
                                                <ItemUpload callbackFromParent = {this.projectImagesUrlCallback} store={'projects'}/>
                                            </div>
                                        )
                                    })
                                }
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
