import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
    NetInfo,
    Modal,
} from "react-native";
import { 
    Container,
    Spinner,
    Button,
    Text,
    Content,
    Header,
    Left,
    Right,
    Title,
    Body,
    Input,
    Card,
    CardItem,
    List,
    ListItem,
    Form,
    Picker,
    Item,
    Textarea,
    Label,
    Thumbnail,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderTitle from "../components/HeaderTitle";
const {width,height} = Dimensions.get('window');

export default class AboutUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container span >
                     <Header style={{backgroundColor:'#030507'}} />
                    <Content >
                        <Header style={{backgroundColor:'#030507'}} >
                            <Title>About Us</Title>
                        </Header>
                        <View style={styles.container}>
                            <View style={[styles.content,styles.contentbody]}>
                                <Text style={styles.text}>
Ganga Service helps you to find the right Service
professionals for activities important to you. Whether you are looking to decorate your home, get candid pictures
 of your wedding, plan your kid's birthday or get healthier, we are sure shot destination for your home service
  needs. Our vision is to 
use technology and smart processes to structure the highly unorganized services market in India.
Ganga Service aspires to make hiring a service professional as easy and straightforward as Amazon
or Flipkart have made buying products.
                                 </Text>
                            </View>
                            

                        </View>
                           
                    </Content>
                </Container>
            );
        }else{
            return (
            <AdvLoder/>
            );
        }
    }
}


class AdvLoder extends Component{
    render(){
        const {width,height} = Dimensions.get('window');
        return(
            <View style={{ flex: 1, width:width, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}> 
                <Spinner color='#2874f0' size='large' style={{height:40}} />
            </View>
        )
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
        justifyContent: 'center',
        backgroundColor:'#abacad',
       
    },
    content:{
        flex:1,
        backgroundColor:'#ffffff',
        alignItems:'center',
        padding:10,
        width:Dimensions.get('window').width-10,
        margin:5,
        height:Dimensions.get('window').height-105,

    },
    contentbody:{
        borderColor:'#032547',
        borderWidth:1,
        borderRadius:5,
    },
    text:{
        fontWeight:'400',
        fontSize:18,
        color:'#030507',
        letterSpacing:1
        
    }

});