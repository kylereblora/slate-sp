import React, { Component } from 'react'
import _ from 'lodash'
import { Table, Header, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './userlist.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            data : this.props.users,
            direction: null,
            clicked:false,
        }
    }

	resetComponent = () => this.setState({ clicked: false })

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state
    
        if (column !== clickedColumn) {

            this.setState({
                column: clickedColumn,
                data : _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })
    
            return
        }

        this.setState({
            direction: direction === 'ascending' ? 'descending' : 'ascending',
            data: data.reverse()
        })
    }


    handleDelete = (e, user) => {
        this.setState({clicked: true}, () => {
            axios.delete(`https://us-central1-slate-sp2.cloudfunctions.net/removeUser?uid=${user.id}`).then(() => {
                this.resetComponent()
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // this lifecycle method is fired if the previous state's data is not equal to the new users array
        if (prevState.data !== this.props.users) {
            this.setState({data:this.props.users})
        }
    }


    render() {
        const { users } = this.props; 
        const { column, data, direction } = this.state

        return (
            <div className="userlist-content">
                {
                    users && users.length > 0 ?

                    <Table sortable celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'firstName' ? direction : null}
                                    onClick={this.handleSort('firstName')}
                                >User</Table.HeaderCell>
                                
                                <Table.HeaderCell
                                    sorted={column === 'occupation' ? direction : null}
                                    onClick={this.handleSort('occupation')}
                                >Occupation</Table.HeaderCell>
                                
                                <Table.HeaderCell>Action</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {data.map(user => {
                                if (user.occupation !== 'Admin') return (
                                    <Table.Row key={user.id}>
                                        
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src={user.proImageUrl || 'https://via.placeholder.com/150'} rounded size='mini' />
                                                <Header.Content>
                                                    <Link className='user-link-style' to={'/profile/'+ user.id} key={user.id}>
                                                        <p className="user-name-preview">{user.firstName + ' ' + user.lastName}</p>
                                                    </Link>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        
                                        <Table.Cell>{user.occupation}</Table.Cell>

                                        <Table.Cell>
                                            <div >
                                                {
                                                    this.state.clicked ?
                                                    <Button fluid loading>Creating seller...</Button>
                                                    :
                                                    <Button onClick={(e) => this.handleDelete(e, user)}>Delete</Button>
                                                }
                                            </div>
                                        </Table.Cell>
                                        
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>

                    :

                    <p>No Users found in the collection.</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : state.firestore.ordered.users,
    }
}


export default  compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'users' }
    ])
)(UserList)