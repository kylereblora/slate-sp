import React, { Component } from 'react'
import { Dimmer, Loader, Modal } from 'semantic-ui-react'
import Navbar from '../../../client/Navbar/Navbar';
import Footer from '../../../client/Footer/Footer';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import './projectdetails.css';
import DeleteProject from '../DeleteProject/DeleteProject';
import EditProject from '../EditProject/EditProject';

export class ProjectDetails extends Component {
    render() {
        const { id, project, user, auth } = this.props;
        
        if(project) {
            return (
                <div className="project-site">
                    <Navbar />
                    <div className="project-main">
                        <div className="project-content">
                            <div className="project-details-grid-container">
                                
                                    <Modal trigger = {
                                        <div className="project-banner">
                                            <img src={project.projectImageUrl} alt={project.projectName}/>
                                        </div>
                                    }>
                                        <Modal.Content>
                                            <div className="modal-content-image">
                                                <img src={project.projectImageUrl} alt={project.projectName}/>
                                            </div>
                                        </Modal.Content>
                                    </Modal>
                                
                                
                                
                                <div className="project-info">
                                    <h1>{project.projectName}</h1>
                                    
                                    {
                                        id === auth.uid ? 

                                        <div className="edit-and-del-project">
                                            <EditProject project={project} id={id} />
                                            <DeleteProject project={project} id={id}/>
                                        </div>

                                        :

                                        null
                                    }

                                    <div className="info-container">
                                        <div className="icon-container">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                        <p>{project.projectLocation}</p>
                                    </div>

                                    <div className="info-container">
                                        <div className="icon-container">
                                            <i className="far fa-calendar-alt"></i>
                                        </div>
                                        <p>{project.projectYear}</p>
                                    </div>
                                    
                                    <div className="info-container">
                                        <div className="icon-container">
                                            <i className="fas fa-coins"></i>
                                        </div>
                                        <p>{project.projectCost}</p>
                                    </div>

                                   <div className="project-description-detailed">
                                        <h3>About this project</h3>
                                        <p className="project-description-newline-format">{project.projectDescription}</p>
                                   </div>
                                    
                                   <div className="additional-project-images">
                                        <h3>Project Photos</h3>
                                        <div className="project-photos">
                                                {
                                                    project.projectImagesArray.length > 0 ?
                                                    
                                                    project.projectImagesArray.map((photo, index) => {
                                                        return (
                                                            <Modal key={index} trigger = {
                                                                <div className="project-pic">
                                                                    <img src={photo} alt={'project_photo'}/>
                                                                </div>
                                                            }>
                                                                <Modal.Content>
                                                                    <div className="modal-content-image">
                                                                        <img src={photo} alt={'project_photo'}/>
                                                                    </div>
                                                                </Modal.Content>
                                                            </Modal>
                                                        )
                                                    })

                                                    :

                                                    <p>This project does not have additional photos.</p>
                                                }
                                        </div>
                                   </div>
                                </div>
                                

                                <div className="spacer-grid"></div>

                                <div className="project-author">
                                    <div className="author-picture">
                                        <img src={user.proImageUrl || "https://via.placeholder.com/150"} alt="avatar"/>
                                    </div>

                                    <div className="about-the-author">
                                        <Link className='author-link-style' to={'/profile/' + id}>
                                            <p>{user.firstName} {user.lastName}</p>
                                        </Link>

                                        {
                                            user.occupation === 'Architect' ? 
                                            <span className="architect-span-author">{user.occupation}</span>
                                            :
                                            <span className="intdes-span-author">{user.occupation}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )

        } else {
            return (
                <div>
                    <Dimmer active inverted>
                        <Loader inverted></Loader>
                    </Dimmer>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const index = ownProps.match.params.index
    const users = state.firestore.data.users
    const project = users ? users[id].projects[index] : null
    const user = users ? users[id] : null
    const auth = state.firebase.auth

    return {
        id,
        project,
        user,
        auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users'])
)(ProjectDetails)
