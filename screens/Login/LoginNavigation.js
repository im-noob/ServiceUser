import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';


import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import CartButton from "../../components/CartButton";
import LoginScreen from "./LoginScreen";
import SignUPScreen from "./SingupScreen"; 
import ForgotScreen from "./ForgotScreen";
import { Button, Text, View,Modal,Dimensions,AsyncStorage, TouchableOpacity,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default createStackNavigator(
    {
      LoginScreen: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
          headerStyle:{backgroundColor:'#030507'},
                headerTitleStyle:{color:'#ffffff'},
                headerLeft:<TouchableOpacity onPress={()=>{navigation.goBack()}}><Icon name='arrow-left-circle' color="#ffffff" size={30}/></TouchableOpacity>,
                
        }),
      },

      SingupScreen:{
        screen:SignUPScreen,
        navigationOptions: ({ navigation }) => ({
         header:null
        }),
      },
      ForgotScreen:{
        screen:ForgotScreen,
        navigationOptions: ({ navigation }) => ({
       header:null
        }),
      }
    },
    // {
    //   initialRouteName :'LoginScreen',
    // }
  );


  // navigationOptions: ({ navigation }) => ({
  //   header:null
  // }),