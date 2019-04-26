import React from 'react'
import { Rating, Header, Image } from 'semantic-ui-react'
import './itemreviews.css'

const ItemReviews = ({reviews, users}) => {
    
    let items = null;
    
    if (users) {
        

        items = reviews.slice(0, 5).map(review => {
            let reviewer = users.filter(user => user.id === review.userId)[0];

            return (
                <div className="review-card" key={review.id}>
    
                    <Header as='h4' image>
                        <Image src={(reviewer && reviewer.proImageUrl) || 'https://via.placeholder.com/150'} rounded size='large' />
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
        })
    }

    return (
        <div>
            {items}
        </div>
    )
}


export default ItemReviews
