import React, { Component } from 'react';

import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import MacroNutrients from '../macro-nutrients';
import MicroNutrients from '../micro-nutrients';

import initTutorial from '../tutorial';
import Foods from '../foods';
import { calculateMacroNutrients, calculateMicroNutrients } from '../calculations';

import nutrients from '../../data/nutrients.json'

export default class FoodNutrition extends Component {
    state = {}
    nutrients$ = from(nutrients)
    nutrientsLimited$ = from(nutrients).pipe(
        map(nutrient => ({
            name: nutrient.name,
            rda: nutrient.rda,
        })),
    )
    updateNutrients = selectedFoods$ => {
        this.setState({
            macroNutrients: calculateMacroNutrients(selectedFoods$),
            microNutrients: calculateMicroNutrients(selectedFoods$, this.nutrientsLimited$),
        })
    }

    componentDidMount() {
        initTutorial()
    }

    render() {
        return (
            <div className="App">
                <div className="leftPanel">
                    <Foods updateNutrients={this.updateNutrients} />
                </div>
                <div className="rightPanel">
                    <MacroNutrients macroNutrients={this.state.macroNutrients} />
                    <MicroNutrients definitions={nutrients} microNutrients={this.state.microNutrients} />
                </div>
            </div>
        )
    }
}
