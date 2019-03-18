import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,ScrollView,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
    NetInfo,
    Modal,
    FlatList,
    ActivityIndicator,
    Image,
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
    Grid,
    CardItem,
    List,
    ListItem,
    Form,
    Picker,
    Item,
    Textarea,
    Label,
    Thumbnail,
    Icon,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Global from "../../../constants/Global";





const {width,height} = Dimensions.get('window');

export default class HomeScreen extends React.Component
{
    constructor(props){
        super(props);
        const {navigation} = this.props;
        this.state={
            catData:[],
            subData:[],
            detailsData:[],
            searchText:'',
            Load:true
        }
       
    }

    componentDidMount(){
        this.filterFetchCat();
    }

    
    /**Fetch data for sub category from the user  */
    filterFetchSub = async(item) => {
        this.setState({Load:false})
        var connectionInfoLocal = '';
        let body = JSON.stringify({'catid':item});
        console.log("Item id : ",body);

       
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
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
                    LodingModal:false,
                });
                fetch(Global.API_URL+'getSubCatHW', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                           'Content-Type':'application/json'
                        },
                    body: body
                    }).then((response) => response.json())
                    .then((responseJson) => {
                      //  var itemsToSet = responseJson.data;
                        console.log('resp sub cat :',responseJson);
                        if(responseJson.received == 'yes'){
                            console.log(responseJson)
                         this.setState({subData:responseJson.sub,catData:[],detailsData:[]})
                            this.setState({Load:true})
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
                    this.filterFetchSub(item);
                });
            }
        });
        console.log(connectionInfoLocal);
    }

     
    /**Fetch category id from server */
    filterFetchCat = async () => {
        this.setState({Load:false})
        var connectionInfoLocal = '';
       
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
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
                    LodingModal:false,
                });
                fetch(Global.API_URL+'getCatHW', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                           'Content-Type':'application/json'
                        },
                        body: JSON.stringify({'searchText':this.state.searchText})
                    }).then((response) => response.json())
                    .then((responseJson) => {
                       // var itemsToSet = responseJson.data;
                        console.log('resp Cat :',responseJson);
                        if(responseJson.received == 'yes'){
                          
                          this.setState({catData:responseJson.category})
                            this.setState({Load:true})
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
                    this.filterFetchCat();
                });
            }
        });
        console.log(connectionInfoLocal);
    }


    filterFetch = async () => {
        this.setState({Load:false})
        var connectionInfoLocal = '';
       
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
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
                    LodingModal:false,
                });
                fetch(Global.API_URL+'filterS', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                           'Content-Type':'application/json'
                        },
                        body: JSON.stringify({'searchText':this.state.searchText})
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var itemsToSet = responseJson.data;
                        console.log('resp:',responseJson);
                        if(responseJson.received == 'yes'){
                            console.log(responseJson)
                            this.setState({catData:responseJson.category,subData:responseJson.sub,detailsData:responseJson.service})
                            this.setState({Load:true})
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
                    this.filterFetch();
                });
            }
        });
        console.log(connectionInfoLocal);
    }

    render_ProfileData = async (info_id) => {
        console.log("in redner profile data:"+info_id);
        var connectionInfoLocal = '';
        var KEY = await AsyncStorage.getItem('Token');
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
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
                this.setState({
                    LodingModal:true,
                })
                console.log('yes internet '); 
                console.log("now featchind data:");
                fetch(Global.API_URL+'render_renderProfileData_US', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Authorization':'Bearer '+KEY,
                        },
                        body: JSON.stringify({ 
                            profileID:info_id,
                         })
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        var itemsToSet = responseJson.data;
                        console.log('resp get profile:',itemsToSet);
                        if(responseJson.received == 'yes'){
                            console.log("profle dat sucessuly featched:");
                            this.setState({
                                LodingModal:false,
                            })
                            console.log("navginatin fot profile screen:");
                            this.props.navigation.navigate('ServiceManProfileScreen',{
                                ProfileData:itemsToSet,
                            });
                            console.log("sent to prifle screen:");
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
                    this.render_ProfileData(info_id);
                });
            }
        });
        console.log(connectionInfoLocal);
    }

    filterFetchList = async (item) => {
        this.setState({Load:false})
        var connectionInfoLocal = '';
        let body = JSON.stringify({'subcatID':item}) ;
       
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            // connectionInfo.type = 'none';//force local loding
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
                    LodingModal:false,
                });
                fetch(Global.API_URL+'getSubCatHW', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                           'Content-Type':'application/json'
                        },
                        body: body
                    }).then((response) => response.json())
                    .then((responseJson) => {
                         // var itemsToSet = responseJson.data;
                        console.log('resp:',responseJson);
                        if(responseJson.received == 'yes'){
                            console.log(responseJson)
                            this.setState({subData:[],catData:[],detailsData:responseJson.sub})
                            this.setState({Load:true})
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
                    this.filterFetchList(item);
                });
            }
        });
        console.log(connectionInfoLocal);
    }

    
    _renderDetails = ({item})=>{
            return(
                <TouchableOpacity onPress={()=>{ this.render_ProfileData(item.info_id)}}>
            <CardItem style={{height:125,borderWidth:1}}>
            <Left>
                                    <Thumbnail square source={{ uri: item.avtar_url }} />
                                </Left>
                                <Body>
                                    <Text style={{fontSize:18,fontWeight:'500'}}>{item.name}</Text>
                                    <View style={{flexDirection:'row'}} numberOfLines={1}>
                                        <Text style={{
                                                fontWeight:'500',
                                                fontSize:15,
                                                backgroundColor:'#ffa329',
                                                color:'white',
                                                borderRadius:5,
                                                paddingHorizontal:5
                                            }}>
                                                {item.ratting}
                                        </Text>
                                        
                                        <Text style={{
                                            fontWeight:'500',
                                            fontSize:15,
                                            color:'#ffa329',
                                            borderRadius:5,
                                            // paddingHorizontal:5
                                        }}>
                                            {item.ratting >=0.5 ? <Icon name="star" size={20}/> : <Icon name="star-outline" size={20}/>}
                                            {item.ratting >=1.5 ? <Icon name="star" size={20}/> : <Icon name="star-outline" size={20}/>}
                                            {item.ratting >=2.5 ? <Icon name="star" size={20}/> : <Icon name="star-outline" size={20}/>}
                                            {item.ratting >=3.5 ? <Icon name="star" size={20}/> : <Icon name="star-outline" size={20}/>}
                                            {item.ratting >=4.5 ? <Icon name="star" size={20}/> : <Icon name="star-outline" size={20}/>}
                                        </Text>
                                        
                                       
                                        
                                    </View>
                                    <Text style={{fontSize:15,}}>({item.review} reviews)</Text>
                                    <Text style={{color:'#0088e0',fontWeight:'500'}}>₹{item.rate} INR/Work</Text>
                                </Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={{fontSize:30,color:'#179ae1'}}/>
                                </Right>
               
            </CardItem>
            </TouchableOpacity>)

    }

    _renderCat = ({item})=>{
        return(
        <TouchableOpacity onPress={()=>{this.filterFetchSub(item.catID)}}>
            <CardItem>
                <Left>
                    <Text style={{fontSize:20}}>{item.name}</Text>
                </Left>
                <Body>
                    <Icon name="ios-arrow-dropright-circle" style={{fontSize:30,color:'#030507'}}/>
                </Body>
                <Right>
                        <Image source={{uri:'https://www.expatincroatia.com/wp-content/uploads/2013/09/how-to-find-a-doctor-in-croatia.jpg'}} style={{height:50,width:100,resizeMode:'contain'}}/>  
                </Right>
            </CardItem>
        </TouchableOpacity>)

    }

    _renderSub = ({item})=>{
        return(
            <TouchableOpacity onPress={()=>{this.filterFetchList(item.subID)}}>
            <CardItem>
                <View>
                <Text>{item.sname}</Text>
                </View>
                <View>
                <Text>{item.info}</Text>
                </View>
            </CardItem>
        </TouchableOpacity>
        )

    }

    render(){
        if(this.state.Load)
        return( 
           <Container>
               <Content>
                   
               <Header style={{backgroundColor:'#030507'}}>
                            <Right style={{borderColor:'#848484',borderRadius:8,borderWidth:1}}>
                                <Icon name='search' style={{fontSize:30,alignSelf:'center',paddingHorizontal:5}} />
                                <Input 
                                    placeholder="Browse" 
                                    autoFocus={true}  
                                    onChangeText={(text) =>{
                                        this.setState({searchText:text});
                                        // this.doSearch(text);
                                    }}  
                                    onSubmitEditing={this.filterFetch}
                                    returnKeyType='search'
                                    
                                />
                               
                            </Right>
                        </Header>
                        {
                                    this.state.detailsData.length!=0?
                                    <Card>
                                        <CardItem style={styles.header}>
                                            <Text style={styles.title}>Service Name</Text>
                                        </CardItem>
                                        <FlatList
                                            data={this.state.detailsData}
                                            renderItem={this._renderDetails}
                                            keyExtractor={(item)=>item.dID+""}
                                            
                                            />
                                    </Card>
                                    :
                                    <Text></Text>
                          }
                          {
                                    this.state.subData.length!=0?
                                    <Card>
                                        <CardItem style={styles.header}>
                                            <Text style={styles.title}>Sub Category</Text>
                                        </CardItem>
                                        <FlatList
                                            data={this.state.subData}
                                            renderItem={this._renderSub}
                                            keyExtractor={(item)=>item.subID+""}
                                            />
                                    </Card>
                                    :
                                    <Text></Text>
                            }
                            {
                                    this.state.catData.length !=0?
                                    <Card>
                                        <CardItem style={styles.header}>
                                            <Text style={styles.title}>Category</Text>
                                        </CardItem>
                                        <FlatList
                                            data={this.state.catData}
                                            renderItem={this._renderCat}
                                            keyExtractor={(item)=>item.catID+""}
                                            />
                                    </Card>
                                    :
                                    <Text></Text>
                            }
                        
               </Content>
           </Container>
        )
        else
        return <AdvLoder/>
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
    title:{fontWeight:'900',
            fontSize:20,
            color:'#ffffff'},   
    header:{
        backgroundColor:'#030507',
        borderWidth:0.5
    }

});