import React, { Component } from 'react'
import { Button, Modal, Icon, Divider } from 'semantic-ui-react'
import { loginBtn } from '../../../assets/styles/styles';
import { checkout } from '../../../store/actions/cartActions'
import { connect } from 'react-redux'
import './orderconfirm.css'
import { numberWithCommas } from '../ItemDetails/priceWithCommas';

export class OrderConfirm extends Component {
    state = {
        clicked: false,
        subtotal: this.props.subtotal,
    }
    
    truncateText = (s) => {
        if (s.length > 35) return s.substring(0,35) + '...';
        else return s;
    }

    handleCheckout = () => {
		this.setState({clicked: true} , () => {
            this.props.checkout(this.props.auth, this.state.subtotal, this.props.tempCart, ).then(() => {
				window.location.href='/orderSuccess'
			});
		})
	}

    render() {
        const { tempCart, auth } = this.props;
        const { subtotal } = this.state;

        if(tempCart) console.log(tempCart);
        

        return (
            <div className="order-confirm-main">
                <Modal
                    trigger={<Button fluid style={loginBtn}>Checkout</Button>}
                    size='small'
                    closeIcon
                    >
                    <Modal.Content>
                        <h1 className='confirm-order-header'>Confirm Order</h1>
                        <p className='please-check'>Please check your order details before proceeding.</p>

                        <div className='order-recap'>
                            <div className="cart-summary-recap">
                                {
                                    tempCart.map(item => {
                                        return (
                                            <div className="item-in-cart-summary" key={item.product.id}>
                                                <p>{this.truncateText(item.product.itemName)}</p>
                                                <div className="spacer"></div>
                                                <span>x{item.qty}</span>
                                            </div>
                                        )
                                        
                                    })
                                }

                                <Divider />

                                <div className="subtotal-container-recap">
                                    <p className="subtotal-recap">Total: </p>
                                    <div className="spacer"></div>
                                    <span>₱{numberWithCommas(subtotal)}</span>
                                </div>
                            </div>
                        </div>
                    </Modal.Content>

                    <Modal.Actions>
                        {
                            this.state.clicked ?
                            <Button disabled loading>
                                Confirming...
                            </Button>
                            :

                            <Button color='green' onClick={this.handleCheckout}>
                                <Icon name='checkmark' /> Confirm
                            </Button>
                        }
                    </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkout : (state, tempCart, subtotal) => dispatch(checkout(state, tempCart, subtotal))
    }
}

export default connect(null, mapDispatchToProps)(OrderConfirm)
