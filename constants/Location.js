import { Constants, Location, Permissions } from 'expo';
import { Platform,ToastAndroid } from 'react-native';
import { Toast } from 'native-base';




 export const  getLocation = async()=>{
    if (Platform.OS === 'android' && !Constants.isDevice) {
        
          return {"msg": 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                    flag:false}
        
      } else {
       return { "msg":await this._getLocationAsync(),"flag":true};
      }
  }

  _getLocationAsync = async () => {
      
    try {
      if(!await Location.hasServicesEnabledAsync()){
        alert('Locations is off Turn it ON');
      
      }
     
   
    if(await this._checkPermission()){
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    let loc = {"latitude": location.coords.latitude,
    "longitude": location.coords.longitude};
   //console.log(loc);
   return  await Location.reverseGeocodeAsync(loc);
      }

    } catch (error) {
      console.log("In GetLocatio", error) 
    }
 

  };

  _checkPermission =async()=>{
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
    console.log('Permission to access location was denied');
     ToastAndroid.showWithGravity('Permission to access location was denied',ToastAndroid.LONG,ToastAndroid.BOTTOM);
    return await false;
    }
    else {
      return await true;
    }
  }

  _getLocation = async ()=>{
    
  }