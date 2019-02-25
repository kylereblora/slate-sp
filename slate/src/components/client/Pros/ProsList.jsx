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
            <p className="pros-list-heading">We've found 5 {categ === undefined ? "Pros" : categ} for you.</p>
            { pros && pros.map(pro => {
                return (
                    <ProsCard pro={pro} key={pro.id} />
                )
            })}           
            
        </div>
    )
}

export default ProsList;