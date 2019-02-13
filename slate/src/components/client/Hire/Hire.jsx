import React, { Component } from 'react'
import ProsList from '../Pros/ProsList';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import './hire.css';


export class Hire extends Component {

    render() {
        const category = this.props.match.params.category;
        const { pros } = this.props;
        console.log(pros)
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
    return {
        pros: state.pro.pros
    }
}

export default connect(mapStateToProps)(Hire)