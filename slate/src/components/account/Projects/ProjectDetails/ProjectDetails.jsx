import React, { Component } from 'react'
import { Button, Dimmer, Loader} from 'semantic-ui-react'
import Navbar from '../../../client/Navbar/Navbar';
import Footer from '../../../client/Footer/Footer';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import './projectdetails.css';

export class ProjectDetails extends Component {
    render() {
        const { id, project } = this.props;
        
        console.log(project);
        
        if(project) {
            return (
                <div className="project-site">
                    <Navbar />
                    <div className="project-main">
                        <div className="project-content">
                            <div className="project-banner">
                                <img src={project.projectImageUrl} alt="project image"/>
                            </div>
                            
                            <div className="project-info">
                                <h1>{project.projectName}</h1>
                                <p>{project.projectLocation}</p>
                                <p>{project.projectYear}</p>
                                <p>₱{project.projectCost}</p>
                                <p>{project.projectDescription}</p>
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
    // const products = state.firestore.data.products
    // const product = products ? products[id] : null
    const users = state.firestore.data.users
    const project = users ? users[id].projects[index] : null
    
    
    return {
        id,
        project
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users'])
)(ProjectDetails)
