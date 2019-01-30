import React from 'react';
import ProsCard from '../ProsCard/ProsCard';
import './proslist.css';

const ProsList = props => {
    return(
        <div className="pros-list">
            <p className="pros-list-heading">We've found 5 pros for you.</p>
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"}/>            
            
        </div>
    )
}

export default ProsList;