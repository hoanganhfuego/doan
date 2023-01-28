import React, { useEffect, useState } from 'react';
import './ListProd.css';
import CardItem from './CardItem';
import program from '../services/program';
import ProdService from '../services/ProdService';

function Cards() {
  const [muscle, setMuscle] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const [apparels, setApparels] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    program.getMuscleProgram().then(res => {
      setMuscle(res.data);
    });
    ProdService.getRSuppProds().then(res => {
      setSupplements(res.data);
    })
    ProdService.getRApparelProds().then(res => {
      setApparels(res.data);
    })
    ProdService.getRAccessoriesProds().then(res => {
      setAccessories(res.data);
    })
  }, [])

  return (
    <div className='cards'>
      <h1>For every level</h1>
      <h2>Custom Programs and Technique guides for you</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {
              muscle.map(
                item =>
                  <CardItem
                    hidePrice
                    src={item.image}
                    text={item.text}
                    label={item.label}
                    path={`list/${item.label}`}
                  />
              )
            }
          </ul>
          <h1>SHOP</h1>
          <h2>Shop premium product with best price</h2>
          <ul className='cards__items'>
            {
              supplements.slice(0, 2).map(
                item =>
                  <CardItem
                    hidePrice
                    src={item.image1}
                    text={item.productname}
                    label={`${item.category}`.toUpperCase()}
                    path={`/details/${item.id}`}
                  />
              )
            }
            {
              apparels.slice(0, 1).map(
                item =>
                  <CardItem
                    hidePrice
                    src={item.image1}
                    text={item.productname}
                    label={`${item.category}`.toUpperCase()}
                    path={`/details/${item.id}`}
                  />
              )
            }
            {
              accessories.slice(0, 1).map(
                item =>
                  <CardItem
                    hidePrice
                    src={item.image1}
                    text={item.productname}
                    label={`${item.category}`.toUpperCase()}
                    path={`/details/${item.id}`}
                  />
              )
            }

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
