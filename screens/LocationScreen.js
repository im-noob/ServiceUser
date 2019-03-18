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
    Icon,
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
import { getLocation } from "../constants/Location";
import TextInputState from 'react-native/lib/TextInputState'
const {width,height} = Dimensions.get('window');

export default class LocationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            street:'',
            region:'',
            postalCode:'',
            country:'',
            city:'',
            name:'',
            phone:'',
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    _getLocation= async()=>{
        let address = await getLocation();
      // console.log(address);
        if(address.flag){
            let msgArray=address.msg;
            msgArray.forEach(async element => {
                console.log(element);
                const {name,region,postalCode,country,city} = element;
                this.setState({street:name,region:region,postalCode:postalCode,country:country,city:city});
                await AsyncStorage.setItem('location',JSON.stringify(element))
            });
        }
        else{

        }
    }
    
    _onSubmit = async()=>{
    try {
            const {name,street,postalCode,country,region,phone,city} =this.state;
            if( street != '' && postalCode != '' && country != '' && region != '' ){
    console.log(" street : "+street+" postalCode : "+postalCode +" Region : "+region +" country : "+country+" city : "+city);
                let location ={"street":street,"postalCode":postalCode ,"Region":region ,"country":country,"city":city}
                await AsyncStorage.setItem("location",JSON.stringify(location));
                this.props.navigation.goBack();
            }
            else{
                ToastAndroid.showWithGravity("All fields are moderator",ToastAndroid.LONG,ToastAndroid.BOTTOM)
            }
        } catch (error) {
            console.log("Error he re ",error);
        }
    }

    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                   {/* <Header style={{backgroundColor:'#030507'}} searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="ios-people" />
                        </Item>
                        <Button transparent>
                            <Text>Search for area, street name</Text>
                        </Button>
                        </Header> */}
                    <Content>
                        <Card>
                            <CardItem>
                                <Button iconLeft transparent onPress={()=>{this._getLocation()}}>
                                    <Icon name="ios-locate" size={25} color="#327ac1"/>
                                    <Text style={{color:'#327ac1'}}> Use current location </Text>
                                </Button>
                            </CardItem>
                        </Card>
                        <View style={{backgroundColor:'#c0c2c4',padding:10}}>
                            <Text style={{color:'#595a5b'}}>Your Address</Text>
                        </View>
                        <Card>
                         {/* <Item floatingLabel>
                                
                                    <Label>Name</Label>
                               
                                    <Input
                                    autoCapitalize="words"
                                    autoComplete="name"
                                    returnKeyType="next"
                                    onSubmitEditing={() => focusTextInput(this.refs.inputB)}
                                    onChangeText={(text)=>{this.setState({name:text})}}
                                    blurOnSubmit={false}
                                    maxLength={40}
                                    value={this.state.name}
                                   // onSubmit={} 
                                   />
                                
                            </Item>
                            <Item floatingLabel>
                                
                                    <Label>Phone</Label>
                               
                                    <Input
                                    ref="refPhone"
                                    autoCapitalize="words"
                                    autoComplete="tel"
                                    returnKeyType="next"
                                    maxLength={40}
                                    onChangeText={(text)=>{this.setState({phone:text})}}
                                    value={this.state.phone}
                                    keyboardType="numeric"
                                    />
                                
                            </Item> */}
                            <Item floatingLabel>
                                
                                    <Label>Street</Label>
                               
                                    <Input
                                    autoCapitalize="words"
                                    maxLength={40}
                                    autoComplete="street-address"
                                    returnKeyType="next"
                                    value={this.state.street}
                                    onChangeText={(text)=>{this.setState({street:text})}}

                                    />
                                
                            </Item>
                            <Item floatingLabel>
                                
                                    <Label>City</Label>
                               
                                    <Input
                                     
                                     returnKeyType="next"
                                    autoCapitalize="words"
                                    maxLength={40}
                                    onChangeText={(text)=>{this.setState({city:text})}}
                                 
                                    value={this.state.city}/>
                                
                            </Item>
                            <Item floatingLabel>
                                
                                    <Label>State</Label>
                               
                                    <Input
                                    autoCapitalize="words"
                                    maxLength={40}
                                    onChangeText={(text)=>{this.setState({region:text})}}
                                   
                                    returnKeyType="next"
                                    value={this.state.region}/>
                                
                            </Item>
                            <Item floatingLabel>
                                
                                    <Label>Country</Label>
                               
                                    <Input
                                    autoCapitalize="words"
                                    maxLength={40}
                                    onChangeText={(text)=>{this.setState({country:text})}}
                                    returnKeyType="next"
                                    value={this.state.country}/>
                                
                            </Item>
                            <Item floatingLabel>
                                
                                    <Label>Zip</Label>
                               
                                    <Input
                                    autoCapitalize="words"
                                    maxLength={40}
                                    onChangeText={(text)=>{this.setState({postalCode:text})}}
                                    returnKeyType="go"
                                    value={this.state.postalCode}/>
                                
                            </Item>
                           
                        </Card>
                        <Button onPress={()=>{this._onSubmit();}} bordered full>
                                    <Text>Save</Text>
                        </Button>

                         
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

 function focusTextInput(node) {
    try {
      TextInputState.focusTextInput(findNodeHandle(node))
    } catch(e) {
      console.log("Couldn't focus text input: ", e.message)
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
    },
    text:{
       color:'#070707' 
    },
    textBox:{

    }
});