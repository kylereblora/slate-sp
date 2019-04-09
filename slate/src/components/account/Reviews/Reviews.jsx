import React, { Component } from 'react'
import { Button, Rating, Form, TextArea, Confirm} from 'semantic-ui-react'
import './reviews.css'
import { disabledLoginBtn, signUpBtn } from '../../../assets/styles/styles';
import { connect } from 'react-redux';
import { addProRating } from '../../../store/actions/proActions';

export class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            proId: this.props.proId,
            content : '',
            rating : 0,
            open: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })
    
    open = () => this.setState({ open: true })

    close = () => this.setState({ open: false });

    handleClick = (e) => {
        if (this.props.auth.uid) {
            if (this.state.rating !== 0 && this.content !== '') this.props.addProRating(this.state).then(() => {
                this.resetComponent();
            })
        } else {
            window.location.href = '/signin'
        }
    }
    
    resetComponent = () => this.setState({
        proId: this.props.proId,
        currentUser: this.props.currentUser,
        content : '',
        rating : 0,
    }, () => {
        this.open()
    })

    render() {
        return (
            <div className="add-pro-review-main">
                <Form>
                    <Rating icon='star' onRate={this.handleRate} maxRating={5}/>

                    <Form.Field required onChange={this.handleChange}>
                        <TextArea id="content" placeholder='Tell us something about this pro..' />
                    </Form.Field>

                    <div className="add-pro-review-btn">
                        {
                            (this.state.content === '' || this.state.rating === 0) ?
                            <Button style={disabledLoginBtn}>Submit Review</Button>
                            :
                            <Button style={signUpBtn} onClick={this.handleClick}>Submit Review</Button>
                        }
                    </div>
                </Form>

                <Confirm open={this.state.open} onCancel={this.close} content='Your review has been sent. Thanks!' onConfirm={this.close} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProRating: (state) => dispatch(addProRating(state))
    }
} 

export default connect(null, mapDispatchToProps)(Reviews)
