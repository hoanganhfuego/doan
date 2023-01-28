import { DataContext } from './Context';
import React, { useContext, useEffect } from 'react';

function PaymentSuccess() {
    const { removeAllProduct } = useContext(DataContext);
    useEffect(() => {
        removeAllProduct();
        setTimeout(() => { window.location.replace('/shop');; }, 250);
    }, []);

    return (
        <div><h1>Loading...</h1></div>
    )
}

export default PaymentSuccess;
