import React, { Component } from "react";
import {
    StyleSheet,
    ImageBackground ,
    KeyboardAvoidingView,
    View,
    Dimensions,
    Image,
    Modal,
    TouchableOpacity,
    Linking,
    NetInfo,
    AsyncStorage,
    ToastAndroid,
    BackHandler,
    Alert

} from "react-native";
import { Container, Spinner, Button,Text, Item,Input,CheckBox,Body, Content} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { } from 'react-native-elements'

import Global from '../../constants/Global';
import { ScrollView } from "react-native-gesture-handler";
import KeyboardShift from "../../components/KeyboardShift";
const {height,width} = Dimensions.get('window');
export default class LoginSingUpV2Screen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            loginModelVisible:false,
            signUpModelVisible:false,
            forgotModelVisible:false,
            submitButtonDisable:false,
            forgot_submitButtonDisable:false,
            number:'9939224274',
            email_or_phone:"",
            password:"",  
            backPress:0,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    // handleBackButton() {
    //     
    // }
    handleBackButton = () => {
        if(this.state.backPress == 0 ){
            ToastAndroid.show('Press Again to Exit App', ToastAndroid.SHORT);
            this.setState({
                backPress:1,
            })
            return true;
        }
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
         )
         return true;
       } 
  
    submitLogin = () =>{

        
            try {
                if(this.state.number.length==10)
                this.props.navigation.navigate('OTP',{'number':this.state.number})
            else
                ToastAndroid.showWithGravity("Invalide Number",ToastAndroid.LONG,ToastAndroid.TOP);
   
            } catch (error) {
                ToastAndroid.showWithGravity("Invalide Number",ToastAndroid.LONG,ToastAndroid.TOP);
   
            }
                
    }
    _signInAsync = async (token,profileData,userID) => {
        userID = userID + "";//converting to string
        console.log("setting token");
        await AsyncStorage.setItem('Token', token);
        console.log("setting user data");
        await AsyncStorage.setItem('userID', userID);

        await AsyncStorage.setItem('userProfileData', profileData);
        console.log("sending to back");
        this.props.navigation.goBack(null);
        console.log("sent to app");
    };
    saveNotificationToken = () => {
        console.log("noti");
    }

    
    

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container style={{backgroundColor:'#ffffff'}}>
                    <ImageBackground source={require('../../assets/images/login.png')} style={{width:width,height:height,resizeMode:'contain'}}>
                        <Content>
                        <KeyboardAvoidingView style={{}} behavior='position' enabled>
                           
                            <View style={{height:height/5}}>

                            </View>

                           
                            
                          <View style={{justifyContent:'center',flexDirection:'row',padding:10, backgroundColor:'#ffffff'}}>
                             
                             <Text style={{fontSize:20,color:'#000000',fontWeight:'500'}}>Please provide your phone number to recive updates</Text>
                         
                          </View>
                         
                         

                            <View style={{justifyContent:'center',flexDirection:'row',padding:10, backgroundColor:'#ffffff'}}>
                             
                            <Item rounded style={{width:width-30}}>
                            <View style={{paddingRight:10,paddingLeft:10}}>
                            <Image source={{uri:'https://cdn.countryflags.com/thumbs/india/flag-400.png'}} style={{height:20,width:20}}/>
                            </View>
                                <View style={{paddingVertical:5,justifyContent:'center'}}>
                                 <Text style={{fontWeight:'900'}}>+91 </Text>
                                </View>
                                
                                <Input placeholder='Mobile No.'  
                                    keyboardType="phone-pad"
                                    onChangeText={(text)=>{this.setState({number:text})}}
                                    value={this.state.number}
                                    onSubmitEditing={()=>{
                                        try {
                                            if(this.state.number.length==10)
                                            this.props.navigation.navigate('OTP',{'Number':this.state.number})
                                        else
                                            ToastAndroid.showWithGravity("Invalide Number",ToastAndroid.LONG,ToastAndroid.TOP);
                               
                                        } catch (error) {
                                            ToastAndroid.showWithGravity("Invalide Number",ToastAndroid.LONG,ToastAndroid.TOP);
                               
                                        }
                                            }}
                                />
                            </Item>
                           
                            </View>
                            <View style={{justifyContent:'center',flexDirection:'row',padding:10, backgroundColor:'#ffffff'}}>
                             
                            
                             
                                 <Button onPress={()=>{this.submitLogin();}} dark>
                                     <Text style={{color:'#ffffff'}}>Proceed</Text>
                                 </Button>
                        
                             </View></KeyboardAvoidingView>
                        </Content>
                    </ImageBackground>
                </Container>
                 
            );
        }else{
            return (
                <View style={styles.loder}>
                <Spinner  color='blue'/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    loder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});