import React, { Component } from 'react';
import { DataContext } from './Context'
import './ProDetails.css';
import './Cart.css';
import ProdService from '../services/ProdService';
import Form from "react-validation/build/form";

class CartBody extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props)
        this.state = {
            price: null,
            prodname: [],
            redirect: [],
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.context.getTotal();
        setTimeout(() => { this.getPrice(); }, 250);
    }

    async getPrice() {
        this.setState({
            price: this.context.total,
            prodname: this.context.cart
        })
    }

    async handleSubmit(event) {
        this.setState({
            loading: true
        })
        event.preventDefault();
        const test = this.state.prodname.slice(0, 1).map(item => item.image1);
        const temp = this.state.prodname.map(item => item.productname + " x " + item.count);
        await ProdService.pay(this.state.price, temp.toLocaleString(), this.context.currentUser.username, test.toLocaleString());
        await ProdService.redirect().then((response) => {
            this.setState({
                redirect: response.data
            })
        });
        await window.location.replace(this.state.redirect[0].link);
    }

    render() {
        const { cart, increase, reduction, removeProduct, total } = this.context;
        if (cart.length === 0) {
            return <h2 style={{ textAlign: "center" }}>You have not added any products yet 🤓</h2>
        } else {
            return (
                <>
                    {
                        cart.map(item => (
                            <div className="details" key={item.id}>
                                <div className="big-img">
                                    <img src={item.image1} alt="" />
                                </div>

                                <div className="box">
                                    <div className="row">
                                        <h2>{item.productname}</h2>
                                        <span>${item.price}</span>
                                    </div>
                                    <hr></hr>

                                    <p>{"Description: " + item.description}</p>
                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(item.id)}> <i class="fas fa-minus-circle"></i> </button>
                                        <span className="quantity">{item.count}</span>
                                        <button className="count" onClick={() => increase(item.id)}> <i class="fas fa-plus-circle"></i> </button>

                                    </div>
                                    <hr />
                                    <span className="totalProd">Total {item.productname} : ${`${item.price * item.count}`.slice(0, 7)}</span>

                                </div>

                                <div className="delete" onClick={() => removeProduct(item.id)}>X</div>

                            </div>

                        ))

                    }
                    <Form onSubmit={this.handleSubmit}>
                        <div className="total">
                            <div className="row">
                                <div className="col-8 subtotal">Subtotal</div>
                                <div className="col-4 totalprice">${`${total}`.slice(0, 7)}</div>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-8 paypal1">Pay now with Paypal </div>
                            <div className="col-4">
                                <button className="btnPay" >
                                    <img src="/images/paypalok-2.png"
                                    /></button>
                            </div>
                        </div>
                    </Form>
                </>
            )
        }
    }
}

export default CartBody;