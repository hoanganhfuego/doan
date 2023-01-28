import React, { Component } from 'react';
import '../../App.css';
import Footer from '../Footer';
import CartBody from '../CartBody'

class Cart extends Component {
    render() {
        return (
            <div>
                <CartBody />
                <Footer />
            </div>
        );
    }
}

export default Cart;