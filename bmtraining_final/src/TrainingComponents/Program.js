import React, { Component } from 'react';
import CardItem from '../components/CardItem';
import './Program.css';
import program from '../services/program';

export default class Program extends Component {
  constructor(props) {
    super(props)
    this.state = {
      muscle: [],
      target: [],
    }
  }

  componentDidMount() {
    program.getMuscleProgram().then((res) => {
      this.setState({ muscle: res.data })
    })
    program.getTargetProgram().then((res) => {
      this.setState({ target: res.data })
    })
  }

  render() {
    return (

      <>
        {/* Có 6 list bài tập theo nhóm cơ: chest/shoulder/leg/arm/back/abs */}
        <h2>Workouts by muscle group</h2>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              {
                this.state.muscle.map(
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
          </div>
        </div>

        {/* có 3 target:burnfat/gainweight/buildmuscle
          Mỗi card có 1 list bài tập, khi ấn vào list bài tập có danh sách bài tập, mỗi bài tập ấn vào sẽ có video.
          */}
        <h2>Workouts by training target </h2>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              {
                this.state.target.map(
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
          </div>
        </div>



      </>

    )
  }
}
