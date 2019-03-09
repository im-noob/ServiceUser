import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    AsyncStorage,
    Image,
    TouchableHighlight,
    
    FlatList,
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
    Subtitle,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tile } from "react-native-elements";
import Global from "../../constants/Global";
import { CartRemoveItem, CartPrepare } from "../../constants/OrderListPrepare";
const {width,height} = Dimensions.get('window');

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            LodingModal: false,
            data:[],
            path:'http://gomarket.ourgts.com/public/',
            GroceryShop:[],

            priceToPay:0,
            savePrice:0,
            save:0,
            selectedShop:{Key:''},
            priceData:[],
            DefaultShop:{},
            name:'',
            address:'',
            zipCode:'',
            pic:'iui',
            priceList:[],

        }
    }

    componentDidMount() {
        
        
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            ()=>{
                console.log("Calling");
                this._start();
            }
        )
            
        console.log("On componentDidMount");
    }

    componentWillUnmount(){
        this.didFocusListener.remove();
    }

    _store =async(item)=>{
        try {
            if(item.shop == null){
                console.log("I am in if part of store ");
            }
            console.log("In Store ");
            await AsyncStorage.setItem('ShopID',""+item.shop.shopInfoID);
            
            await this.setState({name:item.shop.shopName,pic:item.shop.pic,priceToPay:item.priceToPay,savePrice:item.savePrice,address:item.shop.address,zipCode:item.shop.pincode,priceData:item.item});
            //console.log("Selected Shop ",this.state.selectedShop)
         } catch (error) {
            console.log("Selected shop me error he re  ",error);
        }
        console.log("Out of Store ");
    }

    _cartCalc = async()=>{
        try {
            
            var   data =await AsyncStorage.getItem('CartList');
            data = JSON.parse(data);

            data.forEach(ele=>{
            
                this.state.selectedShop.item(ele1=>{
                        
                })
            })


        } catch (error) {
            
        }
    }



    _start =async()=>{
    try {
        
   
        this.setState({path:Global.Image_URL});
        console.log("\nIn Start\n");
     var   data =await AsyncStorage.getItem('CartList');
        data = JSON.parse(data);
     this.setState({data:data});
      
    await this.render_price();
     
      
     await this.setState({renderCoponentFlag: true});
     console.log("Out start");
    } catch (error) {
        console.log("Error he ",error);
    }
    }

   
    
      

     /** fetch price  */
     render_price = async () => {
        console.log("\nIn render Price\n");
        await this.setState({renderCoponentFlag: false});
        
     
         var connectionInfoLocal = '';
        
         NetInfo.getConnectionInfo().then((connectionInfo) => {
             console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            
             if(connectionInfo.type == 'none'){
                 console.log('no internet ');
                 ToastAndroid.showWithGravityAndOffset(
                     'Oops! No Internet Connection',
                     ToastAndroid.LONG,
                     ToastAndroid.BOTTOM,
                     25,
                     50,
                 );
                 return;
             }else{
                 console.log('yes internet '); 
                 this.setState({
                     LodingModal:true,
                 });
                 fetch(Global.API_URL+'Grocery/Shop/product/p', {
                     method: 'POST',
                     headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({ 
                            id:this.state.data,
                           
                          })
                     }).then((response) => response.json())
                     .then((responseJson) => {
                        
                         if(responseJson.received == 'yes'){
                          
                            this._prepareList(responseJson.data);
                          
                         }else{
                             ToastAndroid.showWithGravityAndOffset(
                                 'Internal Server Error',
                                 ToastAndroid.LONG,
                                 ToastAndroid.BOTTOM,
                                 25,
                                 50,
                             );
                         }
                 }).catch((error) => {
                     ToastAndroid.showWithGravityAndOffset(
                         'Network Failed!!! Retrying...',
                         ToastAndroid.LONG,
                         ToastAndroid.BOTTOM,
                         25,
                         50,
                     );
                     console.log('on error fetching:'+error);
                   this.render_price();
                 });
             }
         });
         console.log("\nOut Render Price\n");
        
     }

     /**Calculation of the data  */
     _calculation =async ()=>{
       try {
           console.log("\nIn Calculation\n");
            let tempArray=[];

            /** 
             * this.state.priceList=
             * [{
             *      "item":[{}]
             *      "shop":{}
             *  } 
             * ]
             */

           let cartList = await AsyncStorage.getItem('CartList');
           if(cartList == null){
               console.log("\n : There is not any Data in cart \n");
               this.props.navigation.navigate('Auth');
               return;
           }

           cartList=this.state.data; //JSON.parse(this.state.data);

           /**
            * cartList=
            * [{map,mapcid,size,unit,title}]
            */
              console.log(cartList); 
                       
        
            this.state.priceList.forEach(ele=>{
              /**
               *ele= {
               * "item":[{Quntity,info,map,mapcid,offer,pic,pid,price,shopID,Size,spid,title,unit}]
               * "shop":{address,city,ntoken,pic,pincode,rating,shopInfoID,shopName,uid}
               * }
               */
                var   totalPrice=0;
                var   savePrice=0;
                cartList.forEach(ele2=>{
                    /**
                     * ele2 ={map,mapcid,size,unit,title,Quantity}
                     */
                    ele.item.forEach(ele3=>{
                        /**
                         * ele3 ={Quntity,info,map,mapcid,offer,pic,pid,price,shopID,Size,spid,title,unit}
                         */

                         if(ele2.map==ele3.map && ele2.mapcid == ele3.mapcid && ele2.size == ele3.size && ele2.unit == ele3.unit && ele2.title == ele3.title){
                            totalPrice +=parseInt(ele2.Quantity,10)*parseInt(ele3.price,10);
                            savePrice +=((parseInt(ele2.Quantity,10)*parseInt(ele3.price,10))*parseInt(ele3.offer,10))/100;
                            ele3.Quantity =ele2.Quantity;
                        }
                     })

                })
              /**   ele.item.forEach(ele2=>{
                      totalPrice +=parseInt(ele2.Quantity,10)*parseInt(ele2.price,10);
                      savePrice +=((parseInt(ele2.Quantity,10)*parseInt(ele2.price,10))*parseInt(ele2.offer,10))/100;
                   })*/
                   ele["priceToPay"]=totalPrice;
                   ele["savePrice"]=savePrice;
                 
                  tempArray.push(ele);
            })
            await   this.setState({GroceryShop:tempArray});
            console.log("\nOut Calculation\n");
           

            data =await AsyncStorage.getItem('ShopID');  
            if(data !=null){          
           
    
            this.state.GroceryShop.forEach(element=>{
               
                if(element.shop.shopInfoID == JSON.parse(data)){
                   
                    this.setState({selectedShop:element});
                    this._store(element);
                    console.log("In start : ",element);
                }
                else{
                    console.log("In else me he ");
                }
            })
    
    
    
        }
        else{
            console.log("In class data it is avilabel ",this.state.DefaultShop);
            this.setState({selectedShop:DefaultShop});
            this._store(this.state.selectedShop);
            console.log("In start : ",this.state.selectedShop);
        }
        await this.setState({
            LodingModal:false,
        });    
        } catch (error) {
            console.log("Error in calculation he re beta :",error);
        }
            
       
     }

     _prepareList =async(allData)=>{
         try {

            console.log("\nIn Prepare List\n");
           let tempArray=[];
            let i=0;
         if(allData.length!=0){
               this.setState({DefaultShop:allData[0],selectedShop:allData[0]});
               let d = this.state.DefaultShop;
               
              await  allData.forEach(element=>{
                
                 d.item.forEach(element1=>{
                       i =0;
                      
                       element.item.forEach(element2=>{
                        if(element1.map==element2.map)
                            i++;
                    })
                    if(i==0){
                        element.item.push(element1);
                    }
                   })
                      tempArray.push(element);
                })
            }
           
           // await   this.setState({GroceryShop:tempArray});priceList
           await   this.setState({priceList:tempArray});
           await this._calculation();
        
             
         } catch (error) {
             console.log("Error he calculation part me re :",error);
             
         }
         console.log("\nOut Prepare List\n");
     }

        
    _addQuantity=async(index) =>{
            const data = this.state.data;
            let array=[];
            let totalPrice=0,savePrice=0;
            await data.forEach(element =>{
                if(element.map == index){
                    element.Quantity++; 
                    CartPrepare(element,element.Quantity++);
                
                }
            array.push(element);
            })
            this.setState({data:array});
            await this._calculation();

            console.log(data)
        }

    
    _subQuantity=async(index) =>{

                const data = this.state.data;
                let array=[];
                await  data.forEach(element =>{
                    if(element.map == index){
                    
                        CartPrepare(element,element.Quantity > 1? element.Quantity-1 :element.Quantity);
                    }


                    array.push(element);
                
            
                })
                this.setState({data:array});
                await this._calculation();
                 console.log(data)
            
        }

    _removeItem=async(index) =>{
        try{
            console.log("In remove item");
           await CartRemoveItem(index);
           var   data =await AsyncStorage.getItem('CartList');
           data = JSON.parse(data);
        this.setState({data:data});
           await this._calculation();
        }
         catch(error){
            console.log("Error in remove data :",error);
         }
    }

    _renderCartItem =({item})=>{
      //  console.log(item);
        return(
           
            <Card>
                <CardItem>
                <Left><ImageBackground style={{height:100,width:90}} source={{uri:this.state.path+item.pic}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                   <TouchableHighlight onPress={()=>{this._removeItem(item)}}>
                      <Text style={{fontWeight:'900',fontSize:14,alignSelf:'center',color:'#ce0000'}}>X</Text>
                   </TouchableHighlight>
                   </View>
                   <View style={{borderRadius:4,width:20,backgroundColor:'#ffffff',alignSelf:'flex-end',borderWidth:0.1,borderColor:'#000000'}}>
                       <Text style={{alignSelf:'center'}}>{item.Quantity}</Text>
                   </View>
                   </View>
                 </ImageBackground></Left>
                 <Right>
                    <View style={{flexDirection:'row',padding:5,}}>
                          <Title style={{color:'#000000',fontSize:15}}>{item.title}</Title>
                      </View>
                       <View style={{flexDirection:'row',height:30}}>          
                                    <Button style={{height:30,width:25,alignItems:'center'}}  onPress={()=>{this._subQuantity(item.map); /**this.setState({item:{Quantity:qunt}})*/}}>
                                        <Text style={{color:'#ffffff',textAlign:'center',alignSelf:'center', fontSize:'900',fontSize:15}}>-</Text>
                                    </Button>
                                    <View style={{borderWidth:1,width:50,alignItems:'center'}}>
                                        <Title style={{color:'#000000'}}>{item.Quantity}</Title>
                                    </View>                        
                                    <Button style={{height:30,width:25,alignItems:'center'}}  onPress={()=>{this._addQuantity(item.map); /** this.setState({item:{Quantity:qunt}})*/}}>
                                    <Text style={{color:'#ffffff',textAlign:'center',alignSelf:'center', fontSize:'900',fontSize:15}}>+</Text>
                                     </Button>                          
                                </View>

                 </Right>
                 </CardItem>
            </Card>
            
           );
    }

    _renderShopItem =({item})=>{
       return( 
        <TouchableHighlight onPress={()=>{this._store(item);}}>
           
            <Card>
                <Header style={{backgroundColor:'#07c60e'}}>
                    <Left>
                     <Thumbnail small source={{uri: item.shop.pic}} />
                    </Left>
                    <Right>
                         <Title>{item.shop.shopName}</Title>
                    </Right>
                 
                </Header>
                <CardItem style={{backgroundColor:'#ffffff'}}>
                    <Left>
                        <Title style={{color:'#000000'}} >Price</Title>
                    </Left>
                    <Right>
                     <Title style={{color:'#000000'}} >{item.priceToPay - item.savePrice} Rs</Title>
                        {item.savePrice==0?
                         <Subtitle></Subtitle>
                         :
                         <Subtitle style={{color:'#19751b'}} > save {item.savePrice} Rs Off</Subtitle>
                        }
                       
                    </Right>
                    
                </CardItem>

                <CardItem style={{backgroundColor:'#d4d8d4',borderTopWidth:0.5}}>
                    <Left>
                        <Text>Address</Text>
                    </Left>
                    <Right>
                        <Text>{item.shop.address}</Text>
                    </Right>
                    
                </CardItem>
                <CardItem style={{backgroundColor:'#d4d8d4'}}>
                    <Left>
                        <Text>Pin Code</Text>
                    </Left>
                    <Right>
                        <Text>{item.shop.pincode}</Text>
                    </Right>
                    
                </CardItem>

            </Card>
        </TouchableHighlight> 
        );
    }

    _renderPrice =({item})=>{
        return( 
            <CardItem >
                <Left>
                <Text style={{color:'#000000',fontSize:15,fontWeight:'700'}}>{item.title} ( {item.Quantity} Items )</Text>
                </Left>
                <Right>
                <Text style={{color:'#000000',fontSize:15,fontWeight:'700'}}><Icon name="currency-inr" size={15}/>{(item.price * item.Quantity)-((item.price * item.Quantity)*item.offer/100) }</Text>
                {
                    ((item.price * item.Quantity)*item.offer/100) != 0?
                    <Text style={{color:'#068406',fontSize:15,fontWeight:'700'}}>Save <Icon name="currency-inr" size={15}/>{((item.price * item.Quantity)*item.offer/100) } Off</Text>
                    :
                    <Text></Text>
                }
                </Right>
            </CardItem>
        

         
         );
     }  

    //  Checkout click
    _checkoutPress =async()=>{
       
            try {
             let token =   await AsyncStorage.getItem('Token');
             let userId = await AsyncStorage.getItem('userID');
             let profile = await AsyncStorage.getItem('userProfileData');
            if(token==null||userId== null || profile == null){
              this.props.navigation.navigate('LoginStack') ;
              setTimeout(() => {this.setState({renderCoponentFlag: false})}, 0);    
            }
            else if(this.state.priceData.length != 0) {
                console.log("Passing to confirm ",JSON.parse(profile))
                
                this.props.navigation.navigate('Conifirm',{selectedShop:this.state.selectedShop,items:this.state.priceData,profile:JSON.parse(profile)});
                setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0); 
            }
            else{
                ToastAndroid.showWithGravity("There is Not any Item",ToastAndroid.LONG,ToastAndroid.BOTTOM)
                this.props.navigation.navigate('Home');
            }
              
            } catch (error) {
                
            }
            
       
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>
                    
                    <Card >
                            
                        <Header style={{backgroundColor:'#221793'}}>
                            <Title style={{color:'#ffffff'}}>{this.state.name}</Title>
                        </Header>
                       
                        <CardItem>
                               <Image style={{height:250,width:width-35,resizeMode:'contain'}} source={{uri:this.state.pic}}/>
                        </CardItem>
                       
                <CardItem style={{backgroundColor:'#d4d8d4',borderTopWidth:0.5}}>
                    <Left>
                        <Text>Address</Text>
                    </Left>
                    <Right>
                        <Text>{this.state.address}</Text>
                    </Right>
                    
                </CardItem>
                <CardItem style={{backgroundColor:'#d4d8d4'}}>
                    <Left>
                        <Text>Pin Code</Text>
                    </Left>
                    <Right>
                        <Text>{this.state.zipCode}</Text>
                    </Right>
                    
                </CardItem>

                        <CardItem style={{backgroundColor:'#ffffff'}}>
                            <Left>
                                <Title style={{color:'#000000'}} >Price</Title>
                            </Left>
                            <Right>
                            <Title style={{color:'#000000'}} >{this.state.priceToPay - this.state.savePrice} Rs</Title>
                                {this.state.savePrice==0?
                                <Subtitle></Subtitle>
                                :
                                <Subtitle style={{color:'#19751b'}} > save {this.state.savePrice} Rs Off</Subtitle>
                                }
                            
                            </Right>
                            
                        </CardItem>

                   </Card>
                       <Card >
                            
                                <CardItem style={{backgroundColor:'#221793'}} header>
                                    <Title style={{color:'#ffffff'}}> Available Item Into the cart</Title>
                                </CardItem>
                           
                            <CardItem>
                                   
                                       <FlatList
                                       data={this.state.data}
                                       renderItem={this._renderCartItem}
                                       extraData={this.state}
                                       />
                                    
                            </CardItem>
                           
                       </Card>

                       <Card >
                        <CardItem header style={{backgroundColor:'#cccecc'}} >
                            <Title style={{color:'#646b61'}}>PRICE LIST</Title>
                        </CardItem>
                       
                           <FlatList
                            data={this.state.priceData}
                            renderItem={this._renderPrice}
                            keyExtractor={(item)=>item.pid}
                            extraData={this.state}
                           />
                        <CardItem footer style={{backgroundColor:'#cccecc'}}>
                            <Left>
                                <Title style={{color:'#035904',fontSize:15,fontWeight:'700'}}>Total Price :</Title>
                            </Left>
                            <Right>
                            <Text style={{color:'#035904',fontSize:15,fontWeight:'700'}}><Icon name="currency-inr" color="#035904" size={15}/>{this.state.priceToPay-this.state.savePrice}</Text>
               
                            </Right>
                            
                        </CardItem>
                    </Card>
                  
                        {/* <Button bordered dark onPress={()=>{
                            this.props.navigation.navigate('ComparePriceStack',{});
                        }}>
                            <Text>Cmpare price stack</Text>
                        </Button> */}
                    <Card >
                        <CardItem header style={{backgroundColor:'#243c9e'}}>
                            <Title>Related Shop</Title>
                        </CardItem>
                       
                           <FlatList
                            data={this.state.GroceryShop}
                            renderItem={this._renderShopItem}
                            keyExtractor={(item)=>{console.log(item.shop.shopInfoID)}}
                            extraData={this.state}
                           />
                        
                    </Card>
                    </Content>
                    <View style={{height:50,backgroundColor:'#d6a22a',flexDirection:'row',justifyContent:'space-around'}}>
                        <Button block onPress={()=>{this._checkoutPress()}} ><Text>Checkout</Text></Button>
                    
                    
                        <Button onPress={()=>{this.props.navigation.navigate('Home');}} block><Text>Continu Shopping</Text></Button>
                    </View>
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