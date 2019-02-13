import React from 'react'
import ItemCard from '../ItemCard/ItemCard';
import { Breadcrumb } from 'semantic-ui-react';
import './itemlist.css';

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
                        <ItemCard product={product} key={product.id} />
                    )
                })}
            </div>
            

        </div>
    )
}

export default ItemList
