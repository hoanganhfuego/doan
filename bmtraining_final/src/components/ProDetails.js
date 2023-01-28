import React, { Component } from 'react';
import './ProDetails.css';
import { CartButton } from './Button';
import DetailsThumb from './DetailsThumb';
import { useParams } from 'react-router-dom';
import {DataContext} from './Context';
import AuthService from '../services/auth.service';

class ProdDetail extends Component {
  static contextType = DataContext;

  state = {
    product: [],
    index: 0,
    currentUser: undefined
  }
  
  myRef = React.createRef();

  handleTab = index => {
    this.setState({ index: index })
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount() {
    const { index } = this.state;
    setTimeout(() => { this.getProduct(); }, 250);
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  async getProduct(){
    if(this.props.myHookValue){
      const res = this.context.products;
      const data = await res.filter(item =>{
        return parseInt(item.id) === parseInt(this.props.myHookValue);
      })
      this.setState({product: [{
        id: data[0].id,
        productname: data[0].productname,
        src: [data[0].image1, data[0].image2,
        data[0].image3, data[0].image4],
        description: data[0].description,
        price: data[0].price
      }]})
  }
};
  
  render() {
    const {addCart} = this.context;
    const { product, index, currentUser } = this.state;
    
    return (
      <div className="app">
      {
          product.map(item => (
            <div className="details" key={item.id}>
              <div className="big-img">
                <img src={item.src[index]} alt="" />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.productname}</h2>
                  <span>${item.price}</span>

                </div>
                <hr></hr>

                <p className="preline">{"Description: " + item.description}</p>

                <DetailsThumb images={item.src.filter(item =>{ return item !== null && item !== 'null'; })} tab={this.handleTab} myRef={this.myRef} />
                <div className="hero-btns">
                  <CartButton
                    className='btns'
                    buttonStyle='btn--notice'
                    buttonSize='btn--large'
                    onClick={currentUser ? (() => addCart(item.id)) : (() => window.location='/login')}
                    
                  > 
                   Add to cart
                </CartButton>
                </div>

              </div>

            </div>
          ))
        }
      </div>
    );
  };
}

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useParams();
    return <Component {...props} myHookValue={myHookValue.id} />;
  }
}

export default withMyHook(ProdDetail);