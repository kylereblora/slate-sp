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
    
    truncateText = (s) => {
        if (s.length > 20) return s.substring(0,20) + '...';
        else return s
    }

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
                                                    <Image src={'https://via.placeholder.com/150' || products.filter(product => product.id === review.productId)[0].itemImageUrl} rounded size='mini' />
                                                    <Header.Content>
                                                        {
                                                            products.filter(product => product.id === review.productId)[0] !== undefined ?

                                                            <Link className='review-link-style' to={'/item/'+ products.filter(product => product.id === review.productId)[0].itemCategory + '/' + review.productId} key={review.id}>
                                                                <p className="review-item-preview">{this.truncateText(products.filter(product => product.id === review.productId)[0].itemName)}</p>
                                                            </Link>

                                                            :

                                                            <div>
                                                                <p>Product unavailable.</p>
                                                            </div>
                                                        }
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
                                                        <div>
                                                            <Button fluid loading>Approving review...</Button>
                                                            <Button fluid loading>Approving review...</Button>
                                                        </div>
                                                        :
                                                        <div>
                                                            {
                                                                products.filter(product => product.id === review.productId)[0] !== undefined ?

                                                                <div>
                                                                    <Button color='green' onClick={(e) => this.handleApprove(e, review)} icon='check'/>
                                                                    <Disapprove 
                                                                        userId={review.userId} 
                                                                        revieweeName={products.filter(product => product.id === review.productId)[0].itemName}
                                                                        revieweeId={review.productId}
                                                                        reviewId={review.id}    
                                                                        reviewCollection={'unapproved_reviews'}
                                                                    />
                                                                </div>
                                                                :
                                                                null
                                                            }
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
        unapproved_reviews : state.firestore.ordered.unapproved_reviews,
        products : state.firestore.ordered.products,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(['unapproved_reviews', 'products'])
)(ReviewsToBeApproved)
