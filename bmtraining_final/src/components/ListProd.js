import React from 'react';
import './ListProd.css';
import { BtnAllAppa, BtnAllSupp, BtnAllAcce } from './Button';
import CardItem from './CardItem';
import ProdService from '../services/ProdService';
import Searchbar from '../components/Searchbar';

class Lists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apparels: [],
      supplements: [],
      accessories: []
    }
  }

  componentDidMount() {
    ProdService.getApparelProds().then((response) => {
      this.setState({ apparels: response.data.content })
    });
    ProdService.getSuppProds().then((response) => {
      this.setState({ supplements: response.data.content })
    });
    ProdService.getAccessoriesProds().then((response) => {
      this.setState({ accessories: response.data.content })
    });
  }

  render() {
    const currentUser = this.state;
    return (
      <div>
        <div className='cards'>
          <Searchbar />
          <h1>Supplement</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                {
                  this.state.supplements.slice(0, 4).map(
                    supplement =>
                      <CardItem
                        src={supplement.image1}
                        prodName={supplement.productname}
                        price={supplement.price}
                        path={`/details/${supplement.id}`}
                      />
                  )
                }
              </ul>
            </div>
          </div>
          <div className='hero-btns'>
            <BtnAllSupp
              className='btns'
              buttonStyle='btn--notice'
              buttonSize='btn--large'
            >
              View All Supplement
      </BtnAllSupp>
          </div>

        </div>

        <div className='cards'>
          <h1>Apparel</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                {
                  this.state.apparels.slice(0, 4).map(
                    apparel =>
                      <CardItem
                        src={apparel.image1}
                        prodName={apparel.productname}
                        price={apparel.price}
                        path={`/details/${apparel.id}`}
                      />
                  )
                }
              </ul>

            </div>
          </div>
          <div className='hero-btns'>
            <BtnAllAppa
              className='btns'
              buttonStyle='btn--notice'
              buttonSize='btn--large'
            >
              View All Apparel
      </BtnAllAppa>
          </div>
        </div>
        <div className='cards'>
          <h1>Accessories</h1>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                {
                  this.state.accessories.slice(0, 4).map(
                    accessorie =>
                      <CardItem
                        src={accessorie.image1}
                        prodName={accessorie.productname}
                        price={accessorie.price}
                        path={`/details/${accessorie.id}`}
                      />
                  )
                }
              </ul>

            </div>
          </div>
          <div className='hero-btns'>
            <BtnAllAcce
              className='btns'
              buttonStyle='btn--notice'
              buttonSize='btn--large'
            >
              View All Accessories
      </BtnAllAcce>
          </div>
        </div>
      </div>
    )
  }
}

export default Lists;


