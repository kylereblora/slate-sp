import React, { Component } from 'react'
import { Table, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

export class Orders extends Component {
    render() {
        const { orders } = this.props; 
        
        return (
            <div>
                {
                    orders && orders.length > 0 ?

                    <Table celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                >Order ID</Table.HeaderCell>
                                
                                <Table.HeaderCell
                                >Customer</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {orders.map(order => {
                                return (
                                    <Table.Row key={order.id}>
                                        
                                        <Table.Cell>
                                            <Header>
                                                {order.id}
                                            </Header>
                                        </Table.Cell>
                                        
                                        <Table.Cell>{order.customer}</Table.Cell>

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
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'orders' }
    ])
)(Orders)
