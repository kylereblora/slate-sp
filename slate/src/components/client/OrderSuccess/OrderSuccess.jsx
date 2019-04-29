import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import OrderSuccessSVG from '../../../assets/img/ordersuccess.svg';
import { loginBtn } from '../../../assets/styles/styles';
import { Button } from 'semantic-ui-react'
import './ordersuccess.css'

const OrderSuccess = props => {
    return (
        <div className="order-success-site">
            <Navbar />
            <div className="order-success-main">
                <div className="order-success-content">
                    <div className="success-svg">
                        <img src={OrderSuccessSVG} alt="svgfile"/>
                        <h1>Order Confirmed</h1>
                        <p>Yay! Your order has been submitted for confirmation.</p>
                        <Button style={loginBtn} content='Continue Shopping' onClick={() => { window.location.href='/shop' }} />
                    </div>
                </div>
            </div>
            <Footer />
            
        </div>
    )
}

export default OrderSuccess
