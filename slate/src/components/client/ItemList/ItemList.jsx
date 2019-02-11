import React from 'react'
import ItemCard from '../ItemCard/ItemCard';
import { Breadcrumb } from 'semantic-ui-react';
import './itemlist.css';

const ItemList = (props) => {
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
                <ItemCard itemName ={"Luxe Sofa With Underlying Mattress but has his own set of wheels"} itemPrice={"$1231.23"} /> 
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
                <ItemCard itemName ={"Luxe Sofa"} itemPrice={"$1231.23"} />
            </div>
            

        </div>
    )
}

export default ItemList
