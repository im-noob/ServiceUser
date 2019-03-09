import {StyleSheet,Dimensions} from "react-native";

export const Styles = StyleSheet.create({
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