import React, { Component } from 'react'
import ProsList from '../Pros/ProsList';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import './hire.css';
import SearchPro from '../Search/SearchPro';


export class Hire extends Component {

    render() {
        const category = this.props.match.params.category;
        const { pros } = this.props;
        
        return (
            <div className="hire-site">
                <Navbar />
                <div className="hire-main">
                    {
                        pros ?

                        <div className="hire-container-with-search">
                            <div className="hire-content-with-search">
                                <div className="hire-search">
                                    <div className="hire-flex-container">
                                        <div className="hire-header">
                                            <h2>Hire Professionals</h2>
                                            <p>Choose among various professionals in the platform</p>
                                        </div>

                                        <div className="search-standard">
                                            <SearchPro source={pros} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pro-list-container-hire">
                                    <ProsList category={category} pros={pros}/>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <Dimmer active inverted>
                                <Loader inverted></Loader>
                            </Dimmer>
                        </div>                    
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        pros: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection : 'users' }
    ])
)(Hire)