import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Training from './components/pages/Training';
import Forum from './components/pages/Forum';
import Shop from './components/pages/Shop';
import SignUp from './components/pages/SignUp';
import SearchShop from './components/SearchShop';
import Login from './components/pages/Login';
import DetailProductPage from './components/pages/DetailProductPage';
import Cart from './components/pages/Cart';
import DataProvider from './components/Context';
import DetailForumPost from './components/pages/DetailForumPost';
import FoodNutrition from './components/pages/FoodNutrition';
import BMI from './TrainingComponents/BMI';
import ListWorkout from './TrainingComponents/ListWorkout';
import AllProd from './components/AllProd';
import PaymentSuccess from './components/PaymentSuccess';
import Chart from './components/Chart';
import Profile from './UserComponents/Profile';
import Purchased from './UserComponents/Purchased';


class App extends Component {
  render() {
    return (
      <DataProvider>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/training' component={Training} />
            <Route exact path='/list/:label' component={ListWorkout} />
            <Route exact path='/bmi' component={BMI} />
            <Route exact path='/forum/:id' component={DetailForumPost} />
            <Route exact path='/forum' component={Forum} />
            <Route exact path='/shop' component={Shop} />
            <Route exact path='/profile/:username' component={Profile} />
            <Route exact path='/purchased/:username' component={Purchased} />
            <Route exact path='/category/:category' component={AllProd}/>
            <Route exact path='/searchshop/:value' component={SearchShop} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/chart/:username' component={Chart} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path="/details/:id" component={DetailProductPage} />
            <Route exact path="/food-nutrition" component={FoodNutrition} />
            <Route exact path="/paymentSuccess" component={PaymentSuccess} />
          </Switch>
        </Router>
      </DataProvider>
    );
  }
}

export default withRouter(App);

