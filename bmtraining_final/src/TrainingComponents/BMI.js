import React, { useState, useEffect } from 'react';
import './BMI.css';
import CardItem from '../../src/components/CardItem';
import program from '../services/program';
import AuthService from '../services/auth.service';
import { BtnTracker } from '../../src/components/Button';

function BMI() {
  const [setshow, sethide] = useState(false);
  const [saveBMI, setBMI] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [status, setStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [BMIVal, setBMIVal] = useState(null);
  const [currentUser, setUser] = useState(undefined);

  const onChangeHeight = e => {
    const height = e.target.value;
    setHeight(height);
  };

  const onChangeWeight = e => {
    const weight = e.target.value;
    setWeight(weight);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setUser(user);
    }
  }, []);

  const calculate = () => {
    if (height !== "" && weight !== "") {
      sethide(true);
      const bmi = weight / (height * height) * 10000;
      setBMIVal(Math.round(bmi * 100) / 100);
      if (currentUser) {
        program.saveBMI(currentUser.username, Math.round(bmi * 100) / 100);
      }
      if ((Math.round(bmi * 100) / 100) < 18.5) {
        setBMI("Underweight");
        setStatus("Gain Weight");
        program.getBMI("Gain Weight")
          .then(res => {
            setSuggest(res.data);
          });
      } else if ((Math.round(bmi * 100) / 100) > 18.5 && (Math.round(bmi * 100) / 100) < 24.9) {
        setBMI("Normal");
        setStatus("Build Muscle");
        program.getBMI("Build Muscle")
          .then(res => {
            setSuggest(res.data);
          });
      } else if ((Math.round(bmi * 100) / 100) > 25 && (Math.round(bmi * 100) / 100) < 29.9) {
        setBMI("Over Weight");
        setStatus("Burn fat");
        program.getBMI("Burn fat")
          .then(res => {
            setSuggest(res.data);
          });
      } else {
        setBMI("Obesity");
        setStatus("Burn fat");
        program.getBMI("Burn fat")
          .then(res => {
            setSuggest(res.data);
          });
      }
    } else {
      window.alert("You must fill in enough information!");
    }
  };

  return (
    <>
      <h2>Body Mass Index Calculator</h2>
      <div id="box">
        <div id="container">
          <div id="calculator">
            <input type="text" name="bmi" id="weight" placeholder="Weight In KG" onChange={onChangeWeight} />
            <input type="text" name="bmi" id="height" placeholder="Height In CM" onChange={onChangeHeight} />
            <input type="submit" defaultValue="Calculate" id="calculate" name="calculate" onClick={calculate} />
            <div id="yourBMI">Your BMI Is : {BMIVal} {saveBMI ? (`-> ${saveBMI}`) : (undefined)}</div>
            {setshow ? <>
              {
                currentUser ? (
                  <div className='hero-btns'>
                    <BtnTracker
                      className='btns'
                      buttonStyle='btn--notice'
                      buttonSize='btn--large'
                      data={currentUser.username}
                    >
                      BMI TRACKER
                </BtnTracker>
                  </div>
                ) : (
                  <div>You must be sign to save your data to BMI Tracker</div>
                )
              }
            </> : ""
            }

          </div>
          <div id="guide" className="hidemobile">
            <h2>GUIDE</h2>
            <text>Under Weight = Less Then 18.5 BMI</text> <br />
            <text>Normal Weight = 18.5 To 24.9 BMI</text> <br />
            <text>Over Weight = 25 To 29.9 BMI</text> <br />
            <text>Obesity = 30 Or Greater BMI</text>

          </div>
        </div>
      </div>
      {setshow ? <>
        <h2 className="w_title">Workout recommend for you is {status}</h2>
        <div className='workout_container'>
          <ul className='cards__items_onecard'>
            {
              suggest.map(item => (
                <CardItem
                  hidePrice
                  src={item.image}
                  text={item.text}
                  label={item.label}
                  path={`list/${item.label}`}
                />
              ))
            }
          </ul>

        </div>
      </> : ""}


    </>
  )
}

export default BMI
