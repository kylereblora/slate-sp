import React, { Component } from 'react'
import './projectpreviews.css'

export class ProjectPreviews extends Component {
    render() {
        const { project } = this.props;
        return (
            <div className="project-card">
               <div className="project-preview-main">

                    <div className="responsive-container-project">
                        {/* <div className="dummy"></div> */}
                        
                        <div className="project-picture-preview">
                            <img src={project.projectImageUrl} alt="project image"/>
                        
                        </div>
                    </div>


                    <div className="project-misc">
                        <p className="project-name">{project.projectName}</p>
                        <p className="project-location">{project.projectLocation}</p>
                    </div>

               </div>
            </div>
        )
    }
}

export default ProjectPreviews
