import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './profile.css'
import { Link } from 'react-router-dom'
import ProjectPreviews from '../Projects/ProjectPreviews/ProjectPreviews';
import { loginBtn } from '../../../assets/styles/styles'


export class ProfileProjects extends Component {

    handleClick = (e) => {
        window.location.href = '/add/project/'+ this.props.id ;
    } 

    render() {
        const { user, id, isCurrent } = this.props;
        return (
            <div>
                <div className="project-header">
                    <p className="project-heading">Projects</p>
                    <div className="spacer" />
                    {
                        isCurrent ? 
                        <div className="contact-btn">
                            <Button style={loginBtn} size='small' onClick={this.handleClick}><Icon name='add' />Add Project</Button>
                        </div>
                        : 
                        null
                    }
                </div>
                {
                    user.projects.length > 0 ? 

                    <div className="project-list">
                        {
                            user.projects.map((project, index) => {
                                return (
                                    <Link className='project-link-style' to={'/' + id + '/projects/'+ index} key={index}>
                                        <ProjectPreviews project = {project} />
                                    </Link>
                                )
                            })
                        }
                    </div>
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
