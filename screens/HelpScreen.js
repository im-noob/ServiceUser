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
import { Styles } from "../constants/Styles";
const {width,height} = Dimensions.get('window');

export default class HelpScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            title:'',
            description:''
        }
    }
    componentDidMount() {

        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    _send = ()=>{
        let title =this.state.title;
        let dis =this.state.description;
        if(title !='' && dis != ''){
            console.log(title + dis);
            ToastAndroid.showWithGravity('Thanks for messaging us. We try to be as responsive as possible. Well get back to you soon.',
            ToastAndroid.LONG,ToastAndroid.CENTER);
            this.setState({description:'',title:''});
        }
        else{
            ToastAndroid.showWithGravity('Somthing Wrong',
            ToastAndroid.LONG,ToastAndroid.CENTER); 
        }
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container >
                    <Header style={{backgroundColor:'#030507'}} />
                    <Content >
                        <Header style={{backgroundColor:'#030507'}}>
                            <Title>Customer Support</Title>
                        </Header>
                       
                        <Card>
                        <CardItem>
                               <View >
                                   <Text style={{color:'#2454a0',fontStyle:'italic'}}>Hi  Thanks for getting in touch with us . 
                                       Please send us any questions you may have.</Text>

                                    <Text style={{fontWeight:'900'}}></Text>
                                    <Text style={{fontWeight:'900',color:'#030e21'}}>Call us on : +91 9608240612</Text>
                               </View>
                            </CardItem>
                            <CardItem>
                                <Item regular>
                                    <Input 
                                    onChangeText={(text)=>{this.setState({title:text})}}
                                    placeholder='Enter Your Title'
                                    value={this.state.title} />
                                </Item>
                                
                            </CardItem>
                            <CardItem>
                            <Form>
                                <Textarea 
                                 onChangeText={(text)=>{this.setState({description:text})}}
                                 rowSpan={5} style={{width:width-35}} 
                                 value={this.state.description}
                                 bordered placeholder="Enter Title Description :" 
                                
                                 returnKeyType='send'
                                 />
                            </Form>
                            </CardItem>
                           
                                <Button onPress={()=>{this._send();}} bordered full iconRight>
                                    <Text>Send</Text>
                                    <Icon name="rocket" size={25} color="#030507"/>
                                    
                                </Button>
                         
                            
                        </Card>
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
        justifyContent: 'center'
    }
});