import React from "react";
import {
    Dimensions,
} from "react-native";
import Category from "./Category";
import ItemList from "./ItemList";
import MenuButton from "../../components/MenuButton";
import Details from "./Details";
import CartButton from "../../components/CartButton";
import {createStackNavigator } from 'react-navigation';


export const StackNav =  createStackNavigator(
    {
      category: {
        screen: Category,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Category List",
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
        }),
      },
      ItemDetails:{
          screen: Details,
          navigationOptions: () => ({
            headerTitle:"Item Details",
           headerStyle: {
             backgroundColor: '#2874f0'
           },
         }),
      },
      itemList:{
          screen:ItemList,
          navigationOptions: () => ({
            headerTitle:"Item Details",
           headerStyle: {
             backgroundColor: '#2874f0'
           },
         }),
      }
    },
    {
      
    }
);
