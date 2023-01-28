import React, { Component } from 'react';
import '../../App.css';
import Footer from '../Footer';
import ProDetails from '../ProDetails.js'

export default class DetailProductPage extends Component {
  render() {
    // useEffect(() => {
    //   Axios.get()
    // }, []);
    return (
      <>
        <ProDetails />
        <Footer />
      </>
    );
  }
}
