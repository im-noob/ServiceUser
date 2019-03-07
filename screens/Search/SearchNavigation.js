import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';

import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import CartButton from "../../components/CartButton";
import HomeScreen from "./HomeScreen";
import ShopProductDetails from "../Grocery/ShopProductDetails";
export default  createStackNavigator(
    {
      HomeScreenSearch: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
          
        }),
      },
      ShopProductDetails:{
        screen:ShopProductDetails,
        navigationOptions: ({ navigation }) => ({
          headerTitle:"Details",
          headerStyle: {
            backgroundColor: '#2874f0'
          },
        }),
      }
    },
    {
      
    }
  );