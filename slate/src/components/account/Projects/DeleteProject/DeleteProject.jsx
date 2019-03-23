import React, { Component } from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'
import { basicDefaultBtn } from '../../../../assets/styles/styles';
import { connect } from 'react-redux'
import { deleteProject } from '../../../../store/actions/projectActions'
import './deleteproject.css'

export class DeleteProject extends Component {
    state = {
        project: this.props.project,
        id : this.props.id,
        clicked : false,
    }

    handleDelete = () => {
        this.setState({
            clicked:true
        }, () => {
            this.props.deleteProject(this.state.id, this.state.project).then(() => {
                window.location.href = '/profile/'+ this.state.id
            })
        })
        
    }

    render() {
        
        return (
            <Modal
                trigger={<Button style={basicDefaultBtn}><Icon name='trash' />Delete Project</Button>}
                size='small'
                >
                <Modal.Content>
                    <h1 className='delete-project-header'>Delete Project</h1>
                    <p className='are-you-sure'>Are you sure you want to scrap this project?</p>
                </Modal.Content>

                <Modal.Actions>
                    {
                        this.state.clicked ?
                        <Button disabled>
                            Deleting...
                        </Button>
                        :

                        <Button color='green' onClick={this.handleDelete} inverted>
                            <Icon name='checkmark' /> Proceed
                        </Button>
                    }
                </Modal.Actions>

            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject : (id, project) => dispatch(deleteProject(id, project))
    }
}

export default connect(null, mapDispatchToProps)(DeleteProject)
