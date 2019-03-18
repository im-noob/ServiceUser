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
import { Container, Spinner, Button,Text, Item,Input,CheckBox,Body, Content,Left,Right, Header, Footer,Title} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { } from 'react-native-elements'

import Global from '../../constants/Global';
import { ScrollView } from "react-native-gesture-handler";
import KeyboardShift from "../../components/KeyboardShift";
const {height,width} = Dimensions.get('window');
export default class OTPScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            loginModelVisible:false,
            signUpModelVisible:false,
            forgotModelVisible:false,
            submitButtonDisable:false,
            forgot_submitButtonDisable:false,
            email_or_phone:"",
            password:"",  
            backPress:0,
            otp1:'',
            otp2:'',
            otp3:'',
            otp4:'',
            resendCode:false
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


        if(this.state.email_or_phone.trim().length == 0 || this.state.password.length == 0 ){
            alert("Enter Email and Password first")
            return;
        }
        


        // now sending request to login
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
        console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        if(connectionInfo.type == 'none'){
            console.log("no internet ");
            
            ToastAndroid.showWithGravityAndOffset(
            'Oops! No Internet Connection',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            );        
        }else{
            console.log("yes internet ");
            this.setState({submitButtonDisable:true});
            var username = this.state.email_or_phone.toLowerCase();
            var password = this.state.password;
            console.log(username+":"+password);
            fetch(Global.API_URL+'login_MU', {
                method: 'POST',
                headers: {
                    
                },
                body: JSON.stringify({
                    name:'Your Name',
                    email:username,
                    password:password,
                    user_type:'user',
                    noti_token:Date()+"",
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.error != undefined){
                    if(responseJson.error== "Unauthorised"){
                        this.setState({submitButtonDisable:false});
                        alert("Invalid Email or password");
                        return;
                    }
                    alert("Internal Server error 5004");
                    
                    this.setState({submitButtonDisable:false});
                    return;
                }
                var itemsToSet = responseJson.success.token; 
                var profileData = responseJson.profileData;
                var userID = responseJson.userID;
                console.log("userid",userID);
                console.log(profileData);
                if(responseJson.status == 'valid'){
                    if(itemsToSet.length != 0 ){
                        this._signInAsync(itemsToSet,JSON.stringify(profileData),userID);
                        return;
                    }    
                }else{
                    this.setState({submitButtonDisable:false});
                    alert("Invalid Email or Password");
                }
                
                    console.log("resp:",itemsToSet);
                }).catch((error) => {
                    alert("Internal Server Error 500");
                    console.log("on error featching:"+error);
                    this.setState({submitButtonDisable:false});
            });
        }
        });
        console.log(connectionInfoLocal);
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
        const {navigation} = this.props;
        const number = navigation.getParam('number','0');
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container style={{backgroundColor:'#ffffff'}}>
                    <Header style={{backgroundColor:'#000000'}}/>
                    <Header style={{backgroundColor:'#000000'}}>
                        <Left>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Auth')}}><Icon name='arrow-left-circle' color="#ffffff" size={30}/></TouchableOpacity>
                        </Left>
                        <Body>
                        
                        <Title>Login / SignUp</Title>
                        </Body>
                    </Header>
                    <Body>
                        <View style={{marginTop:20}}>
                        <Text style={{fontWeight:'900',}}>Enter verification code</Text>
                        </View>
                        <Text style={{color:'#b7b7b7'}}> We have sent you a 4 digit verification code on </Text>
                        <Text style={{color:'#000000',fontWeight:'500'}}> +91 {number} </Text>
                        <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:20,padding:10}}>

                            <Item style={{width:width/10,margin:10,borderWidth:1}}>
                                <Input  keyboardType="phone-pad"
                                    onChangeText={(text)=>{this.setState({otp1:text})}}
                                    style={{fontSize:20,fontWeight:'900'}}
                                    value={this.state.otp1} />

                            </Item>
                            <Item style={{width:width/10,margin:10,borderWidth:1}}>
                                <Input  keyboardType="phone-pad"
                                    onChangeText={(text)=>{this.setState({otp2:text})}}
                                    style={{fontSize:20,fontWeight:'900'}}
                                    value={this.state.otp2} />
                            </Item>
                            <Item style={{width:width/10,margin:10,borderWidth:1}}>
                                <Input  keyboardType="phone-pad"
                                    onChangeText={(text)=>{this.setState({otp3:text})}}
                                    style={{fontSize:20,fontWeight:'900'}}
                                    value={this.state.otp3} />
                            </Item>
                            <Item style={{width:width/10,margin:10,borderWidth:1}}>
                                <Input  keyboardType="phone-pad"
                                    onChangeText={(text)=>{this.setState({otp4:text})}}
                                    style={{fontSize:20,fontWeight:'900'}}
                                    value={this.state.otp4} />
                            </Item>

                        </View>
                        {this.state.resendCode?
                            <Button   rounded transparent>
                                <Text>Resend Code</Text>
                            </Button>
                        :<View></View>}
               
                            <Button full >
                                <Text>Submit</Text>
                            </Button>
                              
                     
            
                    </Body>
                   
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