import React from 'react'
import { Rating, Header } from 'semantic-ui-react'
import './reviews.css'

const ReviewCard = ({review}) => {
    
    return (
        <div className="review-card" >
            <Header as='h4' image>
                <Header.Content>
                    <div className="header-content-flex">
                        <div>
                            <p className="review-user">{review.user}</p>
                        </div>

                        <div className="header-content-rating">
                            <Rating size="mini" rating={review.rating} disabled maxRating={5} icon="star" />
                        </div>
                    </div>
                    <p className="review-content-p">{review.content}</p>
                </Header.Content>
            </Header>
        </div>
    )
}

export default ReviewCard
