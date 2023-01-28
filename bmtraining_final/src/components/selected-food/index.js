import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DeleteFilled } from '@ant-design/icons';
import InputNumber from 'react-input-number'

export default class SelectedFood extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    selectedFood: PropTypes.shape({
      food: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      amount: PropTypes.number,
    }).isRequired,
  }
  onAmountChange = amount => {
    this.props.onChange({
      ...this.props.selectedFood,
      amount: amount,
    })
  }
  onDelete = () => this.props.onRemove(this.props.selectedFood)
  render() {
    return (
      <div className="selectedFood">
        <h2>{this.props.selectedFood.food.name}</h2>
        <div className="selectedFoodAmount">
          <InputNumber
            className="form-control"
            addonAfter="grams"
            min={0}
            max={5000}
            type="number"
            onChange={this.onAmountChange}
            value={this.props.selectedFood.amount}
            enableMobileNumericKeyboard
          />
          <DeleteFilled onClick={this.onDelete} className="form-control" />
        </div>
      </div>
    )
  }
}
