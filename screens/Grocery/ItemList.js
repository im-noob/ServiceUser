import React, { Component } from "react";
import {
    StyleSheet,WebView ,Text,View,TouchableOpacity,Dimensions,AsyncStorage,
    ToastAndroid,NetInfo,Modal,FlatList,ScrollView,Image
} from "react-native";
import { 
    Container,Spinner,Content,Header,Grid,Button,
    Left,Right,Title,Body,Input,Card,CardItem,List,ListItem,Form,Picker,Item,
    Textarea,Label,Thumbnail,
} from 'native-base';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const {width,height} = Dimensions.get('window');
import Global from  '../../constants/Global';
import {CartPrepare} from '../../constants/OrderListPrepare';

export default class ItemList extends Component {
    constructor(props){
        super(props);
        const {navigation} = this.props;
        let val = navigation.getParam('sid',5);
        this.state = {
            ProductList:[],
            renderCoponentFlag: false,
            LodingModal: false,
            value:val,
            data:[],
        }
    }


    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this.fatchItem();
    }

    fatchItem =async ()=> {

        if(!this.state.value){
            console.log("Data not found");
            return null;
        }
        
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
     //   console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
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
            this.setState({renderCoponentFlag:false});
            fetch(Global.API_URL+'gro_product', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    id:this.state.value
                })
            }).then((response) => response.json())
            .then((responseJson) => {
               // console.log(responseJson); 
                if(responseJson.received == "yes"){

                    let list = [];
                    var map_id = 0;
                    let index=0;
                    for(let data of responseJson.data.data){
                        if(data.map != map_id){
                            map_id = data.map;
                            let element = {
                                checked:true,
                                index:index++,
                                quantity:1,
                                info:data.info,
                                map:data.map,
                                mapcid:data.mapcid,
                                pic:data.pic,
                                pid:data.pid,
                                price:data.price,
                                size:data.size,
                                stock:data.stock,
                                title:data.title,
                                unit:data.unit
                            };
                            list.push(element);
                        }   
                        else{
                            map_id = data.map;
                        }
                    }
                    this.setState({ProductList:list,data:list,renderCoponentFlag:true});
                    //console.log(responseJson.data.data);
                    console.log("Fstch Dsta printed");
                }
                }).catch((error) => {
                    console.log("on error featching:"+error);
            });
        }
        });
        console.log(connectionInfoLocal);  
    }

    _addQuantity=(index) =>{
        const {ProductList} = this.state;
        ProductList[parseInt(index)].quantity = ProductList[index].quantity +1;
        console.log("Addd");
        this.setState({
            ProductList
        });
        CartPrepare(ProductList[parseInt(index)],ProductList[parseInt(index)].quantity);
    }

 
    _subQuantity=(index) =>{
        const {ProductList} = this.state;
        ProductList[parseInt(index)].quantity = ProductList[index].quantity > 1? ProductList[index].quantity-1 :ProductList[index].quantity;
        console.log("sub");
        this.setState({
            ProductList
        });
        CartPrepare(ProductList[parseInt(index)],ProductList[parseInt(index)].quantity);
    }

    _toggleCheckbox =(index) =>{
        console.log("Index value ",index);
        let checkboxes = this.state.ProductList;
        checkboxes[parseInt(index)].checked = !checkboxes[index].checked;
        this.setState({ProductList:checkboxes});
        CartPrepare(checkboxes[parseInt(index)],checkboxes[parseInt(index)].quantity);
        console.log(this.state.ProductList[index].checked);
    }

    _renderIteam = ({item}) => {
         //console.log('data ',item);
        var uri;
         try {
             item.pic.length == 0 ? uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0":uri="http://gomarket.ourgts.com/public/"+item.pic;  
         } catch (error) {
             uri="https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0"
         }

         //  console.log(uri);
         
         return(    
            <Card>
                <CardItem>
                    <Grid style={{flexDirection:'row'}}>
                        <Grid style={{flex:1}}>
                            <Image style={{width:100, height: 150,borderRadius:5,resizeMode: 'contain',}} source={{uri:uri}}/>
                        </Grid>
                        <Grid style={{paddingHorizontal:8,marginVertical:2,flexDirection:'column',flex:2}}>
                            <Text style={{fontSize:14,fontWeight:'900'}}>{item.title}</Text>
                            <Text style={{fontSize:14,fontWeight:'400'}}>{item.info} </Text>
                            <Text style={{fontSize:14,fontWeight:'600',height:30,margin:5}}>{item.size+" "+item.unit}</Text> 
                            
                            <Grid style={{flexDirection:'row'}}>
                                <Grid style={{flexDirection:'column'}}>
                                    <Text style={{fontSize:16,fontWeight:'900'}}><Icon name={'currency-inr'} size={15}/>{
                                        (item.offer > 0 ) ? 
                                        (item.price - (item.price)*(item.offer/100))
                                            :
                                            item.price
                                        }
                                        {
                                            (item.offer > 0 ) ? 
                                                <Text style={{fontSize:12,textDecorationLine: 'line-through'}}>  MRP <Icon name="currency-inr" size={12}/>{item.price}</Text>
                                            :
                                            null
                                        } 
                                        </Text>
                                    {(item.offer > 0.1) ?
                                        <Text style={{fontSize:14,fontWeight:'500',color:'green'}}>{item.offer}% off</Text>
                                        :
                                        null
                                    }
                                </Grid>
                                {item.checked ?
                                    <Button success onPress={this._toggleCheckbox.bind(this, item.index)}>
                                        <Text style={{fontSize:15,fontWeight:'500'}}>Add+</Text>
                                    </Button>    
                                :
                                <View style={{borderWidth:1,height:40,flexDirection:'row'}}>
                                    <Button  onPress={this._subQuantity.bind(this,item.index)}
                                        style={{height:40}}
                                    >
                                        <Text style={{fontSize:20,fontWeight:'500'}}> - </Text>
                                    </Button>                
                                    <View style={{width:50,height:50,paddingBottom:5}}><Text style={{fontSize:20,alignSelf:'center'}}>{item.Quantity}</Text></View>
                                    <Button onPress={this._addQuantity.bind(this,item.index)}
                                        style={{height:40}}
                                    >
                                        <Text style={{fontSize:20,fontWeight:'500'}}> + </Text>
                                    </Button>
                                </View>
                                }
                            </Grid>  
                        </Grid>
                    </Grid>
                </CardItem>
            </Card>              
        );
         
     }


    render() {        
       
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <ScrollView>  
                        <FlatList
                            extraData = {this.state}
                                data = {this.state.ProductList}
                            renderItem = {this._renderIteam}
                            numColumns={1}
                            keyExtractor = {item => item.index.toString()}     
                        />   
                    </ScrollView>      
                </Container>
            );
        }else{
            return (
                <Spinner color='#2874f0' size='large' style={{height:40}} />
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