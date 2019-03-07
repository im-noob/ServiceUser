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
import Global from "../constants/Global";
import { FlatList } from "react-native-gesture-handler";
const {width,height} = Dimensions.get('window');

const data =[
    {
      "mapsid": 63,
      "pic": null,
      "title": "DETERGENTS",
    },
    {
      "mapsid": 65,
      "pic": null,
      "title": "FRESHNERS",
    },
    {
      "mapsid": 64,
      "pic": null,
      "title": "CLEANERS",
    },
    {
      "mapsid": 67,
      "pic": null,
      "title": "TISSUES & NAPKINS",
    },
    {
      "mapsid": 66,
      "pic": null,
      "title": "INSECT & RODENT REPELLENTS",
    },
    {
      "mapsid": 68,
      "pic": null,
      "title": "INCENSE",
    },
  ];

export default class TopSubCategory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: true,
            LodingModal: true,
            id:0,
            topSubData:[],
            belowSubData:[],
            product:[],
            itemId:0
        }
    }
    
    async componentDidMount() {
        console.log("in top sub category ");   
    
        try {
            this._render_CatSub();
            
        } catch (error) {
            console.log("Component Did Mount :",error);
        }
            console.log("in top sub category ");   
    }

    _render_CatSub = () => {
        const {navigation}=this.props;
        const id =navigation.getParam('id',0);
        const body =JSON.stringify({id:id});
         console.log("IN Fetech ",body);
        // this.setState({renderCoponentFlag: false});
        var connectionInfoLocal = '';
      
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, Sub type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
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
                // this.setState({
                //     LodingModal:true,
                // });
                fetch(Global.API_URL+'gro_subCategory', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: body
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        // var itemsToSet = responseJson.data;
                        console.log('resp:',responseJson);
                        if(responseJson.received == 'yes'){
                        this.setState({topSubData:responseJson.data.data});

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
                    this.render_CatSub();
                });
            }
        });
        console.log(connectionInfoLocal);
    }

    _render_Item = () => {
        const body =JSON.stringify({id:this.state.itemId});
        // console.log("IN Fetech ",body);
        var connectionInfoLocal = '';
      
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, Sub type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
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
                // this.setState({
                //     LodingModal:true,
                // });
                fetch(Global.API_URL+'gro_product_shop', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: body
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        // var itemsToSet = responseJson.data;
                        console.log('resp:',responseJson);
                        if(responseJson.received == 'yes'){
                        // this.setState({topSubData:responseJson.data.data});

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
                    this._render_Item();
                });
            }
        });
        console.log(connectionInfoLocal);
    }

    _renderTopSub=({item})=>{
        return(<View style={{borderWidth:0.5 , borderRadius:25, paddingHorizontal:10,alignItems:'center', backgroundColor:'#e89d2e'}}>
                  <Text>{item.title}</Text>  
                </View>)
    }

    _renderItems =({item})=>{
        return(<CardItem>
                    <Text>{item.title}</Text>
                </CardItem>)
    }
    render() {
        const {renderCoponentFlag} = this.state;
        if(renderCoponentFlag){
            return(
                <Container>
                    <Content>

                        <View style={{height:25,marginVertical:5}}>
                            <FlatList
                                data={data}
                                renderItem={this._renderTopSub}
                                keyExtractor={(item)=>item.mapsid+""}
                                ItemSeparatorComponent={()=>{return <View style={{padding:2}}></View>}}
                                horizontal
                            />
                        </View>
                        <Card>
                            <FlatList
                                data={data}
                                renderItem={this._renderItems}
                                keyExtractor={(item)=>item.mapsid+""}
                                ItemSeparatorComponent={()=>{return <View style={{padding:2}}></View>}}
                            />
                        </Card>
                        {/* <Button bordered dark onPress={()=>{
              this.props.navigation.navigate('ExampleScreenSecond');
            }}>
                            <Text> Go to Second screen</Text>
                        </Button> */}
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