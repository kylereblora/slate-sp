import React, { Component } from 'react'
import { Table, Header, Image, Button,  Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './reviewstobeapproved.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Disapprove from './Disapprove';

const TableHeaders = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Pro</Table.HeaderCell>
        <Table.HeaderCell>Customer</Table.HeaderCell>
        <Table.HeaderCell>Content</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
)

export class ProReviewsToBeApproved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked:false,
        }
    }

    resetComponent = () => this.setState({ clicked: false })
    

    handleApprove = (e, review) => {
        this.setState({clicked:true}, () => {
            axios.post('https://us-central1-slate-sp2.cloudfunctions.net/approveProReview', {review}).then(()=> {
                this.resetComponent();
            })
        })
    }
        
    render() {
        const { unapproved_reviews_pros, users } = this.props; 
        
        return (
            <div className="reviews-to-be-approved-content">
                {
                    users && users.length > 0 && unapproved_reviews_pros && unapproved_reviews_pros.length > 0 ?

                    <Table celled fixed>
                        <TableHeaders />
                        <Table.Body>
                            {
                                unapproved_reviews_pros.map(review => {
                                    return (
                                        <Table.Row key={review.id}>
                                            <Table.Cell>
                                                <Header as='h4' image>
                                                    <Image src={users.filter(user => user.id === review.proId)[0].proImageUrl || 'https://via.placeholder.com/150'} rounded size='mini' />
                                                    <Header.Content>
                                                        <Link className='review-link-style' to={'/profile/'+ review.proId} key={review.id}>
                                                            <p className="review-item-preview">{users.filter(user => user.id === review.proId)[0].firstName +' '+ users.filter(user => user.id === review.proId)[0].lastName}</p>
                                                        </Link>
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>

                                            <Table.Cell><p>{review.currentUser}</p></Table.Cell>

                                            <Table.Cell>
                                                <div className="review-content">
                                                    <div>
                                                        <Rating disabled maxRating={5} rating={review.rating} icon='star'/>
                                                    </div>
                                                    <div className="review-content-p">
                                                        {review.content}
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div >
                                                    {
                                                        this.state.clicked ?
                                                        <div>
                                                            <Button fluid loading>Approving review...</Button>
                                                            <Button fluid loading>Approving review...</Button>
                                                        </div>
                                                        :
                                                        <div>
                                                            <Button color='green' onClick={(e) => this.handleApprove(e, review)} icon='check'/>
                                                            <Disapprove 
                                                                userId={review.userId} 
                                                                revieweeName={users.filter(user => user.id === review.proId)[0].firstName + ' ' + users.filter(user => user.id === review.proId)[0].lastName}
                                                                revieweeId={review.proId}
                                                                reviewId={review.id}   
                                                                reviewCollection={'unapproved_reviews_pros'} 
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )

                                })
                            }
                        </Table.Body>
                    </Table>

                    :

                    <p>No reviews to be approved.</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        unapproved_reviews_pros : state.firestore.ordered.unapproved_reviews_pros,
        users : state.firestore.ordered.users,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(['unapproved_reviews_pros', 'users'])
)(ProReviewsToBeApproved)
