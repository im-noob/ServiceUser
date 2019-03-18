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
    KeyboardAvoidingView,
    FlatList
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

export default class ThanksNote extends Component {
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
            time:'',
            selected: "key1",
            date:[{'flag':false,'key':'A','time':'08:30 AM'},{'flag':false,'key':'B','time':'09:00 AM'},
                    {'flag':false,'key':'C','time':'09:30 AM'},{'flag':false,'key':'D','time':'10:00 AM'},
                    {'flag':false,'key':'E','time':'10:30 AM'},{'flag':false,'key':'F','time':'11:00 AM'},
                    {'flag':false,'key':'G','time':'11:30 AM'},{'flag':false,'key':'H','time':'12:00 PM'},
                    {'flag':false,'key':'I','time':'12:30 PM'},{'flag':false,'key':'J','time':'01:00 PM'},
                    {'flag':false,'key':'K','time':'01:30 PM'},{'flag':false,'key':'L','time':'02:00 PM'},
                    {'flag':false,'key':'M','time':'02:30 PM'},{'flag':false,'key':'N','time':'03:00 PM'},
                    {'flag':false,'key':'O','time':'03:30 PM'},{'flag':false,'key':'P','time':'04:00 PM'},
                    {'flag':false,'key':'Q','time':'04:30 PM'},{'flag':false,'key':'R','time':'05:00 PM'}]
        }
    }
    componentDidMount() {
      
    }
    setData = async()=>{
        try {

            let data = await AsyncStorage.getItem('location');
            data = JSON.parse(data);
            const {name,region,postalCode,country,city} = element;
            this.setState({street:name,region:region,postalCode:postalCode,country:country,city:city});
           
        } catch (error) {
            
        }
    }

    _timeClicked = (index)=>{
        let tempArray =[];
        this.state.date.forEach(element=>{
            element.flag=false;
            if(element.key == index){
                element.flag=true;
                this.setData({time:element.index});
                console.log(element);
            }
            tempArray.push(element);
        });
        this.setState({date:tempArray});
    }

    _renderItem = ({item})=>{

        return(
            <TouchableOpacity onPress={()=>{this._timeClicked(item.key)}}>
            <View style={{width:width/2-20,height:60,justifyContent:'center',borderWidth: 0.5,borderColor:item.flag?'#0f00bc':'#000000',borderRadius:10,margin:7}}>
                    <View style={{marginLeft:5,alignContent:'center',}}> 
                        <Text style={{fontWeight:'500',fontSize:18,color:item.flag?'#0f00bc':'#000000'}}>{item.time}</Text>
                    </View>
                </View>
                </TouchableOpacity>)

    }


    onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                   
                    <Content>
                   
                        <View style={{marginTop:height/6 ,margin:10}}>
                            <Text style={{fontSize:20,fontWeight:'500',color:'#0f7f0e'}}>Your relaationship manager will contact you Shortly</Text>
                            <Text style={{fontSize:20,color:'#9c9e9c'}}>We will contact you in 45 minutes to understand your needs & take your request 
                            further. (Working Hours. Everyday 10 AM to 7 PM)</Text>
                         
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
        justifyContent: 'center'
    },
    text:{
       color:'#070707' 
    },
    textBox:{

    }
});