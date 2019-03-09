import { Constants, Location, Permissions } from 'expo';
import { Platform } from 'react-native';




 export const  getLocation = async()=>{
    if (Platform.OS === 'android' && !Constants.isDevice) {
        
          return {"msg": 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
                    flag:false}
        
      } else {
       return { "msg":await this._getLocationAsync(),"flag":true};
      }
  }

  _getLocationAsync = async () => {
      
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
    //   this.setState({
    //     errorMessage: 'Permission to access location was denied',
    //   });
    console.log('Permission to access location was denied');
    alert('Permission to access location was denied');

    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    let loc = {"latitude": location.coords.latitude,
    "longitude": location.coords.longitude};
   //console.log(loc);
   return  await Location.reverseGeocodeAsync(loc);
    console.log( address);
  //  alert(location);
  };