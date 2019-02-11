import React from 'react';
import ProsList from '../Pros/ProsList';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './hire.css';

class Hire extends React.Component {
    render() {
        return(
            <div className="hire-site">
                <Navbar />
                <div className="hire-main">
                    <ProsList />
                </div>
                <Footer />
            </div>
            
        );
    }
}


export default Hire;