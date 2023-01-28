import React, { Component } from 'react';
import '../../App.css';
import NavTools from '../../TrainingComponents/NavTools';
import Program from '../../TrainingComponents/Program';
import Footer from '../Footer';

export default class Training extends Component {
  render() {
    return (
      <>
      <NavTools/>
      <Program/>
      <Footer />
      </>
    );
  }
}
