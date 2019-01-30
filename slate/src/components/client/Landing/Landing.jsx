import React from 'react';
import './landing.css';

class Landing extends React.Component {
    render() {
        return(
            <div className="landing-main">
                <div className="landing-header">
                    <span>
                        <h1>Local minds, great designs.</h1>
                        <p>Browse item collections and hire experienced pros.</p>
                    </span>
                </div>
            </div>
        );
    }
}


export default Landing;