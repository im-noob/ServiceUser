import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    Image,
    ToastAndroid,
    NetInfo
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
    Item,
    Icon,
    ListItem,
    Modal
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
//import Icon  from 'react-native-vector-icons/Feather';
import Global from "../../../constants/Global";
import DeckSwiperAdvancedExample from "../../ImageExample";




class CategoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            cat_subcat_list:[
                // {
                //   "category": "Travel",
                //   "subcategory": [
                //     {
                //       "key": 1,
                //       "value": "Bolero, Sumos"
                //     },
                //     {
                //       "key": 2,
                //       "value": "E-rikshaw"
                //     }
                //   ]
                // },
                // {
                //   "category": "Repair",
                //   "subcategory": [
                //     {
                //       "key": 3,
                //       "value": "Electronic appliances"
                //     },
                //     {
                //       "key": 4,
                //       "value": "Home wiring & Fitting"
                //     },
                //     {
                //       "key": 5,
                //       "value": "Computer & Laptops"
                //     },
                //     {
                //       "key": 6,
                //       "value": "Furnitures"
                //     },
                //     {
                //       "key": 7,
                //       "value": "Two Wheeler"
                //     },
                //     {
                //       "key": 8,
                //       "value": "Three Wheeler"
                //     },
                //     {
                //       "key": 9,
                //       "value": "Four Wheeler"
                //     }
                //   ]
                // },
                // {
                //   "category": "Software",
                //   "subcategory": [
                //     {
                //       "key": 10,
                //       "value": "Computer Format"
                //     },
                //     {
                //       "key": 11,
                //       "value": "Drivers & Softwares"
                //     },
                //     {
                //       "key": 12,
                //       "value": "Misc Services"
                //     }
                //   ]
                // }
              ],
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
        this.renderCatSubCatData();
    }
    renderCatSubCatData = async () => {
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
                    renderCoponentFlag:false
                });
                console.log('yes internet '); 
                fetch(Global.API_URL+'cat_sub_cat_US', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Authorization':'Bearer '+KEY,
                    },
                    body: JSON.stringify({  })
                }).then((response) => response.json())
                .then((responseJson) => {
                    var itemsToSet = responseJson.data;
                    console.log('resp:',itemsToSet);
                    if(responseJson.received == 'yes'){
                        this.setState({
                            cat_subcat_list:itemsToSet,
                            renderCoponentFlag: true
                        })
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
                console.log('on error featching:'+error);
                this.renderCatSubCatData();
            });
        }
        });
        console.log(connectionInfoLocal);
    }
    render(){
        const {renderCoponentFlag} = this.state;
        
        if(renderCoponentFlag){
            return(
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={{fontSize:40,fontWeight:'900'}}>
                                    Categories
                                </Text>
                                <Text style={{fontSize:15,color:'#a7a7a7'}}>
                                    Browse Service Man By Category or Search Directly
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <List dataArray={this.state.cat_subcat_list}
                        renderRow={(item,key) =>
                        <ListItem onPress={()=>{
                            console.log("category screen button");
                            this.props.navigation.navigate('SubCategoryScreen',{
                                subcategory:item.subcategory
                            });
                        }}>
                            <Left>
                                <Text style={{fontSize:20}}>{item.category}</Text>
                            </Left>
                            <Body>
                             <Icon name="ios-arrow-dropright-circle" style={{fontSize:30,color:'#030507'}}/>
                            </Body>
                            <Right>
                                  <Image source={{uri:'https://www.expatincroatia.com/wp-content/uploads/2013/09/how-to-find-a-doctor-in-croatia.jpg'}} style={{height:50,width:100,resizeMode:'contain'}}/>  
                            </Right>
                        </ListItem>
                        }
                         itemDivider
                        >
                        <View style={{marginBottom:10}}></View>
                    </List>
                </Content>
            );
        }else{
            return (
                <View style={styles.loder}>
                    <AdvLoder/>
                </View>
            );
        }
    }
}

class AdvLoder extends Component{
    render(){
        const {width,height} = Dimensions.get('window');

        return(
            <View style={{ flex: 1, width:width, justifyContent: 'center', alignItems: 'center',backgroundColor:'#666'}}> 
                <Spinner color='#0087e0' size="large" style={{height:40}} /> 
            </View>
        )
    }
}
export default class CategoryScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderCoponentFlag: false,
            street:'',
            region:'',
            postalCode:'',
            country:'',
            city:'',
            name:'',
            phone:''
        }
    }
    componentDidMount() {
        setTimeout(() => {this.setState({renderCoponentFlag: true})}, 0);
    }

    _getLocation =async()=>{
        try {
            let profile = await AsyncStorage.getItem('location');
           if(profile == null){
            this.props.navigation.navigate('Location');
           }
            const {street,postalCode,country,Region,city} = JSON.parse(profile);
            this.setState({street:street,postalCode:postalCode,country:country,region:Region,city:city});
            
        } catch (error) {
            console.log('Error he location me ',error);
        }
    }

    render() {
        const {renderCoponentFlag} = this.state;
        this._getLocation();
        if(renderCoponentFlag){
            return(
                 <Container>
                      <Header style={{backgroundColor:'#030507'}}>
                          <Left>
                       
                          <Text style={{color:'#ffffff'}}> YOU ARE IN</Text>
                        </Left>
                        <Right>
                        <Button  iconRight transparent onPress={()=>{this.props.navigation.navigate('Location');}}>
                            <Icon color="#ffffff" name='ios-arrow-dropdown-circle' />
                            <Text>{this.state.street},{this.state.city},{this.state.region}</Text>
                        </Button>
                        </Right>
                        </Header>
                      <Header style={{backgroundColor:'#030507'}} searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" />
                            <Icon name="ios-people" />
                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>
                        </Header>

                        <Card style={{height:150}}>
                            <DeckSwiperAdvancedExample/>
                            
                        </Card>
                    <CategoryList navigation = {this.props.navigation}/>
                </Container>
            );
        }else{
            return (
                <AdvLoder/>
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