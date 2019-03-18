import { createStackNavigator, createBottomTabNavigator,createAppContainer } from 'react-navigation';
import AddAddressScreen from './AddAddress';
import ServiceTime from './ServiceTime';
import LoginSingUpV2Screen from '../Login/LoginSingUpV2Screen';
import OTPScreen from '../Login/OTPScreen';
import ThanksNote from './ThanksNote';
import HireMeScreen from '../Service/Home/HireMeScreen';

export const OrderNavigation =createStackNavigator({
                                                Address:{ screen:AddAddressScreen,
                                                },
                                                ServiceTime:{
                                                    screen:ServiceTime,
                                                },
                                                Auth:{
                                                    screen:LoginSingUpV2Screen

                                                },
                                                OTP:{
                                                    screen:OTPScreen,
                                                },
                                                Thanks:{
                                                    screen:ThanksNote,
                                                },
                                                HireMe:{
                                                    screen:HireMeScreen,
                                                }
                                                   
                                            });