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
    KeyboardAvoidingView
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
    Footer,
} from 'native-base';


const {width,height} = Dimensions.get('window');

export default class AddAddressScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: true,
            LodingModal: false,
            street:'',
            region:'',
            House:'',
            postalCode:'',
            country:'',
            city:'',
            name:'',
            phone:'',
            selected: "key1"
        }
    }
    componentDidMount() {
        this.setData();
    }
    setData = async()=>{
        try {

            let data = await AsyncStorage.getItem('location');
            data = JSON.parse(data);
            console.log(data);
            const {street,region,postalCode,country,city} = data;
            this.setState({street:street,region:region,postalCode:postalCode,country:country,city:city});
           
        } catch (error) {
            console.log("Erro he re Add Address me : ",error)
        }
    }

    onValueChange(value) {
        this.setState({
          selected: value
        });
      }

    _addAddress = ()=>{
        this.props.navigation.navigate('Time');

    }
    
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                   
                    <Content>
                   
                      
                        <KeyboardAvoidingView style={{}} behavior='position' enabled> 
                       
                            
                   
                            <Title style={{color:'#000000',fontSize:30}}>Add Address</Title>
                      
                            <Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                            style={{ width: width/3,margin:5,borderWidth:0.5 }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                            >
                            <Picker.Item label="Mr." value="Mr" />
                            <Picker.Item label="Miss" value="Miss" />
                            
                            </Picker>
                            <Input value={this.state.name} 
                            onChangeText={(text)=>{this.setState({name:text})}}
                             style={{ margin:10,borderWidth:0.5 }} placeholder="Name"/>
                            <Input value={this.state.House} 
                            onChangeText={(text)=>{this.setState({House:text})}}
                             style={{ margin:10,borderWidth:0.5 }} placeholder="House & Street"/>
                            <Input value={this.state.street+", "+this.state.city+", "+this.state.region}
                            
                             style={{ margin:10,borderWidth:0.5 }} placeholder="Locality"/>

                             <Button full bordered onPress={()=>{this._addAddress();}}> 
                            <Text style={{fontSize:20}}>Next ></Text> 
                            </Button>
                           
                      
                        </KeyboardAvoidingView>
                    
                        
                        
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
    },
    text:{
       color:'#070707' 
    },
    textBox:{

    }
});