import React, { Component } from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Chat from '../Chat';

export default class Home extends Component {
  render() {
    return (
      <>
        <HeroSection />
        <Cards />
        <Chat />
        <Footer />
      </>
    );
  }
}
