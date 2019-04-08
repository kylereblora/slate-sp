import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import NotFoundSVG from '../../../assets/img/notfound.svg'
import './notfound.css'

const NotFound = props => {
    return (
        <div className="not-found-site">
            <Navbar />
                <div className="not-found-main">
                    <div className='not-found-content'>
                        <img src={NotFoundSVG} alt="notfoundsvg"/>
                        <p>Oops! The page you're trying to access might have been deleted.</p>
                    </div>
                </div>
            <Footer />
        </div>
    )
}


export default NotFound
