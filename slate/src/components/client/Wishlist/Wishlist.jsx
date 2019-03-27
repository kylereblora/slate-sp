import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ItemInWishlist from './ItemInWishlist/ItemInWishlist'
import './wishlist.css'
import RelaxingSVG from '../../../assets/img/relaxing.svg'

export class Wishlist extends Component {
    render() {
        const { auth, wishlist, id } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        if (auth.uid !== id) return <Redirect to={'/wishlist/'+ auth.uid} />
        return (
            <div className="wishlist-site">
                <Navbar />
                <div className="wishlist-main">
                
                    <div className="wishlist-products">
                        <h1>Wishlist</h1>
                        {
                            wishlist && wishlist.length > 0 ? 
                            wishlist.map(product => {
                                return (
                                    <ItemInWishlist product={product} key={product.id} currentUser={auth.uid}/>
                                )
                            })
                            :
                            <div className="wishlist-svg">
                                <img src={RelaxingSVG} alt="svgfile"/>
                                <p>Your wishlist seems empty...</p>
                            </div>
                        }
                    </div>
                
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const wishlist = users ? users[id].wishlist : null 

    return { 
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        wishlist,
        id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['users'])
)(Wishlist)
