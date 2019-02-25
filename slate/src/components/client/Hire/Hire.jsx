import React, { Component } from 'react'
import ProsList from '../Pros/ProsList';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './hire.css';


export class Hire extends Component {

    render() {
        const category = this.props.match.params.category;
        const { pros } = this.props;
        return (
            <div className="hire-site">
                <Navbar />
                <div className="hire-main">
                    <ProsList category={category} pros={pros}/>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
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