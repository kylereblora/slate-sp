import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './profile.css'

export class ProfileProjects extends Component {
    render() {
        const { user, isCurrent } = this.props;
        return (
            <div>
                <div className="project-header">
                    <p className="project-heading">Projects</p>
                    <div className="spacer" />
                    {
                        isCurrent ? 
                        <div className="contact-btn">
                            <Button inverted color='orange' size='large'>Add Project</Button>
                        </div>
                        : 
                        null
                    }
                </div>
                {
                    user.proProjects ? 

                    <div>Yay</div>
                    :
                    <div className="no-projects-yet">
                        <span className="no-projects-span"><h1>No projects yet.</h1></span>
                    </div> 
                }
            </div>
        )
    }
}

export default ProfileProjects
