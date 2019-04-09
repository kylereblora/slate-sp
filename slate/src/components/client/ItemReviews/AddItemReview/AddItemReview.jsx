import React, { Component } from 'react'
import { disabledLoginBtn, signUpBtn } from '../../../../assets/styles/styles';
import { Button, Rating, Form, TextArea, Confirm} from 'semantic-ui-react'
import './additemreview.css'
import { addProductReview } from '../../../../store/actions/productActions';
import { connect } from 'react-redux';

export class AddItemReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.id,
            user: this.props.profile.firstName + ' ' + this.props.profile.lastName,
            userId: this.props.userId,
            content : '',
            rating : 0,
            open: false,
        }
    }

    open = () => this.setState({ open: true })

    close = () => window.location.reload();

    resetComponent = () => this.setState({
        productId: this.props.id, 
        user: this.props.profile.firstName + ' ' + this.props.profile.lastName,
        content : '',
        rating : 0,
    }, () => {
        this.open()
    })

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })
    
    handleClick = (e) => {
        if (this.props.auth.uid) {
            if (this.state.rating !== 0 && this.content !== '') this.props.addProductReview(this.state).then(() => {
                this.resetComponent();
            })
            
            
        } else {
            window.location.href = '/signin'
        }
        
    }

    render() {
        return (
            <div className="add-item-review-main">
                <Form>
                    <Rating icon='star' onRate={this.handleRate} maxRating={5}/>

                    <Form.Field required onChange={this.handleChange}>
                        <TextArea id="content" placeholder='Tell us something about this product..' />
                    </Form.Field>

                    <div className="add-review-btn">
                        {
                            (this.state.content === '' || this.state.rating === 0) ?
                            <Button style={disabledLoginBtn}>Submit Review</Button>
                            :
                            <Button style={signUpBtn} onClick={this.handleClick}>Submit Review</Button>
                        }
                    </div>
                </Form>

                <Confirm open={this.state.open} onCancel={this.close} content='Your review has been sent for admin approval. Thanks!' onConfirm={this.close} />
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addProductReview: (state) => dispatch(addProductReview(state))
    }
} 

export default connect(null, mapDispatchToProps)(AddItemReview)
