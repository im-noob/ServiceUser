import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator,createAppContainer } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginNavigation from '../screens/Login/LoginNavigation';
import LoginSingUpScreen from '../screens/Login/LoginSingUpScreen';
import OTPScreen from '../screens/Login/OTPScreen';
import AddAddressScreen from '../screens/OrderSystem/AddAddress';
import ServiceTime from '../screens/OrderSystem/ServiceTime';
import ThanksNote from '../screens/OrderSystem/ThanksNote';


class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header:null,
  };
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    await AsyncStorage.removeItem('Token');
    const userToken = await AsyncStorage.getItem('Token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'Auth' : 'Auth');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');

  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const AppStack = createStackNavigator({ 
  Home: {
    screen: MainTabNavigator,
    navigationOptions:{
      header:null,
    }
  },
});

const AuthStack = createStackNavigator({ 
  SignIn:{
    screen:LoginNavigation,
    navigationOptions:{
      header:null,
    }
  },
});

const SwetichNav =  createSwitchNavigator(
  {
   
    AuthLoading: {
      screen:AuthLoadingScreen,
      navigationOptions:{
        header:null,
      }
    },
    Auth: {
      screen:LoginSingUpScreen,
      navigationOptions:{
        header:null,
      }
    },
    App: {
      screen:AppStack,
      navigationOptions:{
        title:"hehh"
      }
    },
    OTP:{
      screen:OTPScreen,
      navigationOptions:{
        title:"Login / SignUp"
      }
    }
   
  },
  { 
    initialRouteName: 'AuthLoading',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      header:null
    },
   
  }
);

const AppContainer = createAppContainer(SwetichNav);
export default AppContainer;
// export default createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// });

// _showMoreApp = () => {
//   this.props.navigation.navigate('Other');
// };

// _signOutAsync = async () => {
//   await AsyncStorage.clear();
//   this.props.navigation.navigate('Auth');
// };

// _signInAsync = async () => {
//   await AsyncStorage.setItem('userToken_S', 'abc');
//   this.props.navigation.navigate('App');
// };