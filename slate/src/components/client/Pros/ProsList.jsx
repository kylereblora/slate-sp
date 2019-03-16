import React from 'react';
import ProsCard from '../ProsCard/ProsCard';
import './proslist.css';

function isArchitect(obj) {
    return obj.occupation === 'Architect'
}

function isInteriorDesigner(obj) {
    return obj.occupation === 'Interior Designer'
}

const ProsList = ({pros, category}) => {
    let categ = category;
    if (categ === "interior-designer") categ = 'Interior Designers';
    else if(categ === "architect") categ = 'Architects';

    return(
        <div className="pros-list">           
            {/* <p className="pros-list-heading">We've found 5 {categ === undefined ? "Pros" : categ} for you.</p> */}
            <h2>Architects</h2>
            { pros && pros.filter(isArchitect).map(pro => {
                return (
                    <ProsCard pro={pro} key={pro.id} />
                )
            })}           

            <h2>Interior Designers</h2>
            { pros && pros.filter(isInteriorDesigner).map(pro => {
                return (
                    <ProsCard pro={pro} key={pro.id} />
                )
            })}
            
        </div>
    )
}

export default ProsList;