import React, { Component } from 'react'
import { Table, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { numberWithCommas } from '../../client/ItemDetails/priceWithCommas'
import './orders.css'

function getUserName(id) {
    return function(obj) {
        return obj.id === id;
    }
}


export class Orders extends Component {
    truncateText = (s) => {
        if (s.length > 15) return s.substring(0,15) + '...';
        else return s
    }

    render() {
        const { orders, users, products } = this.props; 
        
        return (
            <div>
                {
                    orders && users && orders.length > 0 ?

                    <Table celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                >Order ID</Table.HeaderCell>
                                
                                <Table.HeaderCell
                                >Customer</Table.HeaderCell>

                                <Table.HeaderCell
                                >Cart</Table.HeaderCell>

                                <Table.HeaderCell
                                >Subtotal</Table.HeaderCell>

                                
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {orders.map(order => {
                                return (
                                    <Table.Row key={order.id}>
                                        
                                        <Table.Cell>
                                            <Header>
                                                {this.truncateText(order.id)}
                                            </Header>
                                        </Table.Cell>
                                        
                                        <Table.Cell>{users.filter(getUserName(order.customer))[0].firstName + ' ' + users.filter(getUserName(order.customer))[0].lastName}</Table.Cell>
                                        <Table.Cell>{order.orderList.map((item, index) => {
                                            return (
                                                <div className="order-item-admin" key={index}>
                                                    <Header as='h4' image>
                                                        <Image src={products.filter(product => product.id === item.product.id)[0].itemImageUrl || 'https://via.placeholder.com/150'} rounded size='mini' />
                                                        <Header.Content>
                                                            <Link className='review-link-style' to={'/item/'+ products.filter(product => product.id === item.product.id)[0].itemCategory + '/' + item.product.id}>
                                                                <p className="review-item-preview">{this.truncateText(products.filter(product => product.id === item.product.id)[0].itemName)}</p>
                                                            </Link>
                                                        </Header.Content>
                                                    </Header>

                                                    <span>Qty: {item.qty}</span>
                                                </div>
                                            )
                                        })}</Table.Cell>
                                        <Table.Cell>&#8369;{numberWithCommas(order.subtotal)}</Table.Cell>
                                        
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>

                    :

                    <p>No orders found in the collection.</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders : state.firestore.ordered.orders,
        users: state.firestore.ordered.users,
        products: state.firestore.ordered.products,
        
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['orders', 'users', 'products'])
)(Orders)
