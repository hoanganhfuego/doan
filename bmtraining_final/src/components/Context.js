import React, { Component } from 'react';
import ProdService from '../services/ProdService';
import AuthService from '../services/auth.service';

export const DataContext = React.createContext();

export default class DataProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            cart: [],
            total: 0,
            currentUser: undefined
        }
    }

    addCart = (idx) => {
        const { products, cart } = this.state;
        const check = cart.every(item => {
            return item.id !== idx;
        })
        if (check) {
            const data = products.filter(product => {
                return product.id === idx;
            })
            this.setState({ cart: [...cart, ...data] })
        } else {
            alert("The product has been added to cart.");
        }
    };

    reduction = idx => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item.id === idx) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    increase = idx => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item.id === idx) {
                item.count += 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    removeProduct = idx => {
        if (window.confirm("Do you want to delete this product?")) {
            const { cart } = this.state;
            cart.forEach((item, index) => {
                if (item.id === idx) {
                    cart.splice(index, 1)
                }
            })
            this.setState({ cart: cart });
            this.getTotal();
        }

    };

    removeAllProduct = () => {
        this.setState({ cart: [] });
        this.getTotal();
    };

    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        this.setState({ total: res })
    };

    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({ cart: dataCart });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal });
        }
        this.getItem();
        this.getCurrentUser();
    }

    async getCurrentUser() {
        const user = await AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            })
        }
    }

    async getItem() {
        await ProdService.getAllProds().then((response) => {
            this.setState({ products: response.data.content })
        });
    }

    render() {
        const { products, cart, total, currentUser } = this.state;
        const { addCart, reduction, increase, removeProduct, getTotal, removeAllProduct } = this;
        return (
            <DataContext.Provider
                value={{ products, addCart, cart, reduction, increase, removeProduct, total, getTotal, removeAllProduct, currentUser }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}