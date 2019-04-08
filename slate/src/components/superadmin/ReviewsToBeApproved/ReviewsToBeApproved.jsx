import React, { Component } from 'react'
import _ from 'lodash'
import { Table, Header, Image, Button, Modal, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './reviewstobeapproved.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const TableHeaders = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Item</Table.HeaderCell>
        <Table.HeaderCell>Customer</Table.HeaderCell>
        <Table.HeaderCell>Content</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
)

export class ReviewsToBeApproved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked:false,
        }
    }

    resetComponent = () => this.setState({ clicked: false })
    

    handleApprove = (e, review) => {
        this.setState({clicked:true}, () => {
            axios.post('https://us-central1-slate-sp2.cloudfunctions.net/approveReview', {review}).then(()=> {
                this.resetComponent();
            })
        })
    }
        
    render() {
        const { unapproved_reviews, products } = this.props; 
        
        return (
            <div className="reviews-to-be-approved-content">
                {
                    products && products.length > 0 && unapproved_reviews && unapproved_reviews.length > 0 ?

                    <Table celled fixed>
                        <TableHeaders />
                        <Table.Body>
                            {
                                unapproved_reviews.map(review => {
                                    return (
                                        <Table.Row key={review.id}>
                                            <Table.Cell>
                                                <Header as='h4' image>
                                                    <Image src={products.filter(product => product.id === review.productId)[0].itemImageUrl || 'https://via.placeholder.com/150'} rounded size='mini' />
                                                    <Header.Content>
                                                        <Link className='review-link-style' to={'/item/'+ products.filter(product => product.id === review.productId)[0].itemCategory + '/' + review.productId} key={review.id}>
                                                            <p className="review-item-preview">{products.filter(product => product.id === review.productId)[0].itemName}</p>
                                                        </Link>
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>

                                            <Table.Cell><p>{review.user}</p></Table.Cell>

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
                                                        <Button fluid loading>Approving review...</Button>
                                                        :
                                                        <Button onClick={(e) => this.handleApprove(e, review)}>Approve</Button>
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
        unapproved_reviews : state.firestore.ordered.unapproved_reviews,
        products : state.firestore.ordered.products,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(['unapproved_reviews', 'products'])
)(ReviewsToBeApproved)
