import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Navbar from '../../client/Navbar/Navbar'
import Footer from '../../client/Footer/Footer'
import './orders.css'
import OrderSVG from '../../../assets/img/continue.svg';
import {Redirect} from 'react-router-dom'
import { numberWithCommas } from '../../client/ItemDetails/priceWithCommas';
import { loginBtn } from '../../../assets/styles/styles';
import { Button } from 'semantic-ui-react';

function getOrdersWithSameId(id) {
    return function(obj) {
        return obj.customer === id;
    }
}

export class Orders extends Component {
    render() {
        const { id, auth, orders } = this.props; 

        let myOrders = []
        if (!auth.uid) return <Redirect to='/' />
        
        if ( orders ) {
            myOrders = orders.filter(getOrdersWithSameId(id));
        }

        console.log(myOrders);
        

        
        return (
            <div className="orders-site">
                <Navbar />
                <div className="orders-main">
                    <div className="orders-content">
                        <h1>Orders</h1>
                        {
                            myOrders && myOrders.length > 0 ?
                            <div>
                                {
                                    myOrders.map(order => {
                                        return (
                                            <div className="order-item" key={order.id}>
                                                <h3>Order ID: {order.id} </h3>
                                                <span className="confirming">Status: CONFIRMING</span>
                                                <p>Total: ₱{numberWithCommas(order.subtotal)}</p>
                                                <div className="order-pics">
                                                {
                                                    order.orderList.map((product) => {
                                                        return (
                                                            <div className="ordered-item-prev" key={product.product.id}>
                                                                <div className="responsive-container-orders">
                                                                    <div className="dummy"></div>
                                                                    <div className="item-picture-orders">
                                                                        <img src={product.product.itemImageUrl} alt="ordered item"/>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="cart-svg">
                                <img src={OrderSVG} alt="svgfile"/>
                                <p>You currently have no orders</p>
                                <Button style={loginBtn} content='Shop for Items' onClick={this.handleShopItems} />
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const orders = state.firestore.ordered.orders;

    return {
        id,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        orders
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['orders'])
)(Orders)
