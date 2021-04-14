import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { createAppContainer , createSwitchNavigator} from 'react-navigation'; 
import {createBottomTabNavigator} from 'react-navigation-tabs'
import explorescreen from './screens/explorescreen';
import issuescreen from './screens/issuescreen'
import login from './screens/login';

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}


const navigator = createBottomTabNavigator({
  Transations : {screen:issuescreen},
  SearchBooks : {screen:explorescreen}
},

{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const route = navigation.state.routeName;
      if(route === "Transations"){
        return(
          <Image source={require('./assets/book.png')}
          style={{width:20, height:20}}/>
        )
      }else if(route === "SearchBooks"){
        return(
          <Image source={require('./assets/searchingbook.png')}
          style={{width:20, height:20}}/>
        )
      }  
    }
  })
}
)

const switchNavigator = createSwitchNavigator({
  Login : {screen:login},
  TabNavigator : {screen:navigator}
})

const AppContainer = createAppContainer(switchNavigator);