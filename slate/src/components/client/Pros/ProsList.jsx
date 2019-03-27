import React from 'react';
import ProsCard from '../ProsCard/ProsCard';
import './proslist.css';
import { NavLink } from 'react-router-dom';

function isArchitect(obj) {
    return obj.occupation === 'Architect'
}

function isInteriorDesigner(obj) {
    return obj.occupation === 'Interior Designer'
}

const ProsList = ({pros, category}) => {
    let categ = category;
    if (categ === "interior-designers") categ = 'Interior Designers';
    else if(categ === "architects") categ = 'Architects';
    else categ = "Architects";
    
    console.log(categ);
    

    return(
        <div className="hire-content">
            <div className="hire-content-grid-container">
                <div className="hire-sidenav">
                    <p>All Professionals</p>
                    <NavLink 
                        to="/hire/architects"
                        className="hire-sidenav-link"
                        activeClassName="hire-sidenav-link-selected"
                        >Architects</NavLink>
                    <NavLink 
                        to="/hire/interior-designers"
                        className="hire-sidenav-link"
                        activeClassName="hire-sidenav-link-selected"
                        >Interior Designers</NavLink>
                </div>

                <div className="pros-list">           
                   {
                       categ === "Architects" 
                       
                       ?

                       <div>
                           <h1>Architects</h1>
                            { pros && pros.filter(isArchitect).map(pro => {
                                return (
                                    <ProsCard pro={pro} key={pro.id} />
                                )
                            })}   
                       </div>
                       
                       :
   
                       <div>
                           <h1>Interior Designers</h1>
                            { pros && pros.filter(isInteriorDesigner).map(pro => {
                                return (
                                    <ProsCard pro={pro} key={pro.id} />
                                )
                            })}
                       </div>
                   }
                </div>
            </div>    
        </div>
    )
}

export default ProsList;