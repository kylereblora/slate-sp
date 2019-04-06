import React, { Component } from 'react'
import _ from 'lodash'
import { Table, Header, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './userlist.css'
import axios from 'axios';

export class UserList extends Component {
    state = {
        column: null,
        data: this.props.users,
        direction: null,
    }

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
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    handleDelete = (e, user) => {
        axios.delete(`https://us-central1-slate-sp2.cloudfunctions.net/removeUser?uid=${user.id}`).then(() => {
            // window.location.reload();
            console.log('Delete user success');
            
        })
        
    }

    render() {
        const { column, data, direction } = this.state

        return (
            <div className="userlist-content">
                {
                    data.length > 0 ?

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
                            {_.map(data, user => {
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
                                            <Button onClick={(e) => this.handleDelete(e, user)}>Delete</Button>
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


export default UserList