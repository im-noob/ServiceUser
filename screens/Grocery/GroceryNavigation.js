import React from "react";
import {
    View,
    Dimensions,
} from "react-native";
import { 
    Text,
} from 'native-base';
import Icon  from 'react-native-vector-icons/Feather';
import MenuButton from "../../components/MenuButton";
import CartNavigation from "../Cart/CartNavigation";
import CartButton from "../../components/CartButton";
import ShoppingPage from  "./ShopList";
import ShopCategory from './ShopCategory';
import {createAppContainer, createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import ShopDetail from './shopDetails';
import ShopsProductsList from './ShopProductList';
import ShopProductDetails from './ShopProductDetails';
import MostBuying from './MostBuying';
import { StackNav } from "./StackNav";


const DailyLife =  createStackNavigator(
  {
    daily: {
      screen: MostBuying,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Daily Use",
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
        headerRight: <CartButton obj={navigation} value="10"  />,
      }),
    }
  },
  {
    
  }
);




const ShoppingScreen =  createStackNavigator(
  {
    ShopList: {
      screen: ShoppingPage,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Shop List",
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
        headerRight: <CartButton obj={navigation} value="10"  />,
      }),
    },
    CategoryList:{
        screen: ShopCategory,
        navigationOptions: () => ({
          headerTitle:"Catrgory",
         headerStyle: {
           backgroundColor: '#2874f0'
         },
       }),
    },
    ShopDetail:{
        screen:ShopDetail,
        navigationOptions: () => ({
          headerTitle:"Details",
         headerStyle: {
           backgroundColor: '#2874f0'
         },
       }),
    },
    ShopsProductsList:{
      screen: ShopsProductsList,
      navigationOptions: () => ({
        headerTitle:"Prodoct List",
       headerStyle: {
         backgroundColor: '#2874f0'
       },
     }),
    },
    ShopProductDetails:{
        screen:ShopProductDetails,
        navigationOptions: () => ({
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

 

const TabNavigator = createBottomTabNavigator(
  {
      HomeStack: DailyLife,
      Category:StackNav,
      Shopping: ShoppingScreen,
      Cart: CartNavigation,
  },
  {
    defaultNavigationOptions  : ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName='worker';
        if(routeName == 'HomeStack'){
            iconName =`home${focused?'':''}`;
        } else if(routeName == 'Category'){
            iconName =`grid${focused?'':''}`;
        } else if (routeName === 'Shopping') {
            iconName = `lock${focused ? '' : ''}`;
        } else if (routeName === 'Cart') {
            iconName = `shopping-cart${focused ? '' : ''}`;
        }
        return <Icon name={iconName} size={30} color={tintColor} style={{fontWeight:'900'}}/>;
      },
      
    }),
    tabBarOptions: {
        activeTintColor: '#0087e0',
        inactiveTintColor: '#747474',
        style:{backgroundColor: '#fff'},
        showLabel:false,
    },
        
    animationEnabled: false,
    swipeEnabled: true,
    initialRouteName :'HomeStack',

  },
);

export default createAppContainer(TabNavigator);
