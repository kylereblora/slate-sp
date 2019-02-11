import React from 'react';
import ProsCard from '../ProsCard/ProsCard';
import { Breadcrumb } from 'semantic-ui-react';
import './proslist.css';

const ProsList = props => {
    return(
        <div className="pros-list">
            <div className="crumbs">
                <Breadcrumb>
                    <Breadcrumb.Section link>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>Store</Breadcrumb.Section>
                </Breadcrumb>
            </div>

            
            <p className="pros-list-heading">We've found 5 pros for you.</p>
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"} contactNumber={"09283049470"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"} contactNumber={"09283049470"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"} contactNumber={"09283049470"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"} contactNumber={"09283049470"}/>            
            <ProsCard proName={"Architect 1"} proLocation={"Quezon City"} proDescription={"Hello i am from qc"} contactNumber={"09283049470"}/>            
            
        </div>
    )
}

export default ProsList;