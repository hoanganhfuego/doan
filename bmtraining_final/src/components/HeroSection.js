import React from 'react';
import '../App.css';
import { TrainingButton, FoodButton } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/introvid.MOV' autoPlay loop muted />
      <h1>Mucle Workouts</h1>
      <p>No Pain No Gain!</p>
      <div className='hero-btns'>
        <TrainingButton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </TrainingButton>
        <FoodButton
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          FOOD NUTRITION
        </FoodButton>
      </div>
    </div>
  );
}

export default HeroSection;
