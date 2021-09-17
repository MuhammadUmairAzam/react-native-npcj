import React, { Component } from 'react'
import { Provider } from "react-redux"
import MyReducers from './source/data/local/reducers/MyReducers'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// ................Screen Imports.................
import SplashScreen from './source/Views/SplashScreen';
import MainHome from './source/Views/MainHome'
import RecordDisplay from './source/Views/RecordDisplay';

// ..................................

const Stack = createStackNavigator();

export default class App extends Component {


  render() {
    return (
      <Provider store={MyReducers}>
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'}>

            {/*Splash Screens */}
             <Stack.Screen name={'SplashScreen'} component={SplashScreen} /> 
            {/* Home Screens */}
            <Stack.Screen name={'MainHome'} component={MainHome} />  
            {/* Result Screen  */}
            <Stack.Screen name={'RecordDisplay'} component={RecordDisplay} />            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}