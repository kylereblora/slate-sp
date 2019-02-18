import React from 'react'
import ItemCard from '../ItemCard/ItemCard';
import { Breadcrumb } from 'semantic-ui-react';
import './itemlist.css';
import { Link } from 'react-router-dom'

const ItemList = ({products}) => {
    return (
        <div className="items-list">
            <div className="crumbs">
                <Breadcrumb>
                    <Breadcrumb.Section link>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>Store</Breadcrumb.Section>
                </Breadcrumb>
            </div>

            <div className="items-list-main">
                { products && products.map(product => {
                    return(
                        <Link to={'/item/'+ product.itemCategory + '/' + product.id} key={product.id}>
                            <ItemCard product={product} />
                        </Link>
                    )
                })}
            </div>
            

        </div>
    )
}

export default ItemList
