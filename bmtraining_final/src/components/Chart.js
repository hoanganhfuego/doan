import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import program from '../services/program';
import Footer from './Footer'
import { useParams } from 'react-router';

var Chart = () => {
  var params = useParams();
  var [date, setDate] = useState([]);
  var [bmi, setBMI] = useState([]);
  var tdate = [];
  var tbmi = [];
  function getAPI() {
    program.getBMITracker(params.username)
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          tdate.push(res.data[i].caldate.substring(0, 11));
          tbmi.push(res.data[i].bmi);
        }
        setDate(tdate);
        setBMI(tbmi);
      });
  }

  useEffect(() => {
    getAPI();
  }, []);

  var data = (canvas) => {
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(63, 81, 181, 700);
    gradient.addColorStop(0, '#929dd9');
    gradient.addColorStop(1, '#172b4d');

    return {
      labels: date,
      datasets: [
        {
          label: 'BMI',
          data: bmi,
          borderColor: 'black',
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
        }
      ]
    };
  };

  var options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Date',
            fontSize: 18,
            fontColor: 'black'
        
          },
          gridLines: {
            display: true,
            color: 'black'
          },
          ticks: {
            fontColor: 'black',
            fontSize: 16
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'BMI',
            fontSize: 18,
            fontColor: 'black'
          },
          gridLines: {
            display: true,
            color: 'black'
          },
          ticks: {
            fontColor: 'black',
            fontSize: 16,
            beginAtZero: true
          }
        }
      ]
    },
    tooltips: {
      titleFontSize: 13,
      bodyFontSize: 13
    }
  };

  return (
    <>
      <Line data={data} options={options} />
      <Footer/>
    </>
  );
};

Chart.propTypes = {
  labelData: PropTypes.array,
  bmiData: PropTypes.array
};

export default Chart;