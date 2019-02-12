import React from 'react';
import ProsCard from '../ProsCard/ProsCard';
import { Breadcrumb } from 'semantic-ui-react';
import './proslist.css';

const ProsList = ({pros, category}) => {
    let categ = category;
    if (categ === "interior-designer") categ = 'Interior Designers';
    else if(categ === "architect") categ = 'Architects';

    return(
        <div className="pros-list">
            <div className="crumbs">
                <Breadcrumb>
                    <Breadcrumb.Section link>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>Store</Breadcrumb.Section>
                </Breadcrumb>
            </div>

            
            <p className="pros-list-heading">We've found 5 {category === undefined ? "Pros" : category} for you.</p>
            { pros && pros.map(pro => {
                return (
                    <ProsCard pro={pro} key={pro.id} />
                )
            })}           
            
        </div>
    )
}

export default ProsList;