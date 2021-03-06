import React, { Component } from 'react'
import { Form, Button, Input, TextArea, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import Navbar from '../../../client/Navbar/Navbar';
import Footer from '../../../client/Footer/Footer';
import './addproject.css';
import { years } from './years';
import { costs } from './costs';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createProject } from '../../../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import ItemUpload from '../../../admin/Items/CreateItem/ItemUpload'
import { loginBtn, disabledLoginBtn } from '../../../../assets/styles/styles'
import PhotoGuideline from '../../../../assets/img/photoguideline2.svg'

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
            projectImagesArray : [],
            clicked: false,
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

    projectImagesUrlCallback = (data) => {
        const { projectImagesArray } = this.state;

        let arr = projectImagesArray.slice();

        if(arr.length < 5) arr.push(data);
        else if (arr.length === 5) alert('You have exceeded the maximum number of photos allowed. If you wish to add more photos, remove other images currently uploaded.')

        this.setState({projectImagesArray : arr});
    }

    handleDeleteProjectImage = (e, index) => {
        const { projectImagesArray } = this.state;
 
        let arr = projectImagesArray.slice();
        arr.splice(index, 1)
 
        this.setState({projectImagesArray : arr});
    }

    handleDeleteProjectBanner = () => {
        this.setState({projectImageUrl: ''})
    }

    handleSubmit = (e) => {

        if((this.state.projectName && this.state.projectCost && this.state.projectLocation && this.state.projectYear
        && this.state.projectDescription && this.state.projectImageUrl) !== '') {
            
            this.setState({clicked: true}, () => {
                this.props.createProject(this.state, this.props.auth.uid).then(() => {
                    window.location.href = '/profile/'+this.props.auth.uid;
                })
            })
            
        }

    }

    

    render() {
        const { auth, user } = this.props;
        
        if (!auth.uid) return <Redirect to='/' />

        const { projectImagesArray } = this.state; 
        let newProjectImagesArray = ['0', '0', '0', '0', '0']
        
        return (
            <div>
                {
                    auth && user ?

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
                                                <Input id="projectName" type='text' placeholder='Three-Storey Contemporary House' />
                                            </Form.Field>

                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Cost</label>
                                            
                                                <Dropdown placeholder='Less than ₱50,000' name='projectCost' options={costs} onChange={this.handleDropdownChange} selection />
                                            </Form.Field>

                                            <Form.Field required onChange={this.handleChange}>
                                                <label>Project Location</label>
                                            
                                                <Input id="projectLocation" type='text'/>
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

                                            
                                            <div className="form-buttons">
                                                {
                                                    (this.state.projectName && this.state.projectCost && this.state.projectLocation && this.state.projectYear
                                                        && this.state.projectDescription && this.state.projectImageUrl) === '' ?

                                                    <Button fluid style={disabledLoginBtn}>Add Project</Button>
                                                    :

                                                    <div className="edit-form-buttons">
                                                        {
                                                            this.state.clicked ?
                                                            <Button fluid loading>Adding project...</Button>
                                                            :
                                                            <Button fluid style={loginBtn} type='submit' onClick={this.handleSubmit}>Add Project</Button>
                                                        }
                                                    </div>
                                                    
                                                    
                                                }
                                            </div>
                                        </Form>
                                    </div>

                                    <div className="add-project-guidelines">
                                        <h2>Guidelines</h2>
                                        
                                        <div className="guidelines-main">
                                            <div className="photo-guidelines-svg">
                                                <img src={PhotoGuideline} alt="photoguideline"/>
                                            </div>
                                            <div className="guidelines-ul">
                                                <ul>
                                                    <li><p>Format your project location properly (e.g Quezon City, NCR)</p></li>
                                                    <li><p>Upload high quality photos (1MB or more)</p></li>
                                                </ul>
                                            </div>
                                        </div>
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const users = state.firestore.data.users;
    const user = users ? users[id] : null

    return {
        auth: state.firebase.auth,
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project, state) => dispatch(createProject(project, state))
    }
} 

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(['users'])
)(AddProject)
