import React, { Component } from 'react'
import { Form, Modal, Button, Dropdown } from 'semantic-ui-react'
import { reasons }  from './reasonsForDisapproval'
import './disapprove.css'
import axios from 'axios'

export class Disapprove extends Component {
    state = {
        userId: this.props.userId,
        content: '',
        revieweeName: this.props.revieweeName,
        revieweeId: this.props.revieweeId,
        reviewId: this.props.reviewId,
        reviewCollection: this.props.reviewCollection,
        clicked: false,
        open: false,
    }

    open = (e) => this.setState({open: true})

    close = (e) => this.setState({open: false})

    resetComponent = () => this.setState({ clicked: false, open: false })
    
    handleDropdownChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    handleDisapprove = (e) => {
        this.setState({clicked: true} , () => {
            const disapproval = {
                userId: this.state.userId,
                content: this.state.content,
                revieweeName: this.state.revieweeName,
                revieweeId: this.state.revieweeId,
                reviewId: this.state.reviewId,
                reviewCollection: this.state.reviewCollection
            }

            axios.post('https://us-central1-slate-sp2.cloudfunctions.net/disapproveReview', {disapproval}).then(()=> {
                this.resetComponent();
            })
        })
        
    }

    render() {
        return (
            <Modal
                open={this.state.open}
                trigger={<Button color='red' icon='close' onClick={this.open}/>}
                size='small'
                >

                <Modal.Content>
                    <h1 className='disapprove-review-header'>Disapprove Review</h1>
                    <Form>

                        <Form.Field required onChange={this.handleChange}>
                            <label>Reason for Disapproval</label>
                            <Dropdown placeholder='...' name='content' options={reasons} onChange={this.handleDropdownChange} selection />
                        </Form.Field>

                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button content='Cancel' onClick={this.close} />
                    {
                        this.state.clicked ?
                        <Button disabled>
                            Disapproving...
                        </Button>
                        :

                        <Button color='green' onClick={this.handleDisapprove} inverted>
                            Proceed
                        </Button>
                    }
                </Modal.Actions>
            </Modal>
        )
    }
}

export default Disapprove
