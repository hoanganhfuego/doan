import React, { Component } from 'react';
import '../../App.css';
// import Cards from '../Cards';
import Footer from '../Footer';
import Lists from '../ListProd';

export default class Home extends Component {
  render() {
    return (
      <>
        <Lists />
        <Footer />
      </>
    );
  }
}