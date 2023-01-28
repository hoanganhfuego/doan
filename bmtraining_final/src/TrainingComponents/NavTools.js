import React, { Component } from 'react'
import { BtnTool } from '../components/Button'
export default class NavTools extends Component {
  render() {
    return (
     
        <>
        <h1>Tools</h1>
        <div className="hero-btns">
                  <BtnTool
                    className='btns'
                    buttonStyle='btn--notice'
                    buttonSize='btn--large'
                  > 
                   BMI Calculator
                </BtnTool>
                </div>
        </>
     
    )
  }
}
