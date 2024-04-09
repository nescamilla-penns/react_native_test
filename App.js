/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuScreen from './src/screens/MenuScreen';
import DealerScreen from './src/screens/DealerScreen';
import BrandScreen from './src/screens/BrandScreen';
import ProductScreen from './src/screens/ProductScreen';
import SurveyProductScreen from './src/screens/SurveyProductScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import DAOFacade from './src/model/DAOFacade';
import Sync from './src/net/Sync';

const AppNavigator = createStackNavigator({
  // Screen stack
  Login: {screen: LoginScreen},
  Menu: {screen: MenuScreen},
  Dealer: {screen: DealerScreen},
  Brand: {screen: BrandScreen},
  Product: {screen: ProductScreen},
  SurveyProduct: {screen: SurveyProductScreen},
  Survey: {screen: SurveyScreen},
  },{
    // Stack properties
    initialRouteName: 'Login',
    headerMode: 'none'
  });

console.disableYellowBox = true;

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // 3 seconds
    this.intervalTime = 3 * 1000;
    // Interval reference
    this.interval = 0;
    this.sync = new Sync();
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.sync.sendData(DAOFacade.getInstance());
    }, this.intervalTime);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <AppContainer />;
  }
}