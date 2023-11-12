import React ,{useState,useEffect}from 'react'
import { View, Text ,Image, StyleSheet, Dimensions,ToastAndroid, TouchableOpacity,Alert,ActivityIndicator} from 'react-native'
import CustomInputs from '../../../components/CustomInputs/CustomInputs';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const {width,height} = Dimensions.get('window');
const OTPscreen = () => {

  const [otp,setOtp] = useState("");
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); 
  const SubmitOTP = async () => {

    if(otp.trim() === ""){
      Alert.alert('One Time Password', 'Please input One Time Password');
    }else
    {
      setIsLoading(true);
      try {
        const response = await axios.post('https://mindmatters-ejmd.onrender.com/otp', {
          otp: otp, // Pass the email to the server
        });
    
        // Check the response status
        if (response.status === 200) {
              console.log(response.data.message);
          if (response.data.message === 'match') {
            setIsLoading(false);
            Alert.alert(
              'One Time Password',
              'Verification Success ',
              [
                {
                  text: 'OK',
                  onPress: () => OneTime(),
                },
              ],
              { cancelable: false }
            );
          } else {
            setIsLoading(false);
            Alert.alert('One Time Password', 'OTP code is Invalid ');
          }
        } else {
          ToastAndroid.show('Error: Unexpected server response', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show('Network error', ToastAndroid.SHORT);
      }
    }
  };

  const OneTime = () => {
      navigation.navigate('NewPass');
  }


  return (
    <View style={styles.root}>
    <View style={styles.circle} />
    <View style={styles.circle2} />

    <LottieView
       source={require('../../../../assets/animation/forgot.json')}
       autoPlay
       loop
       style={{ width: width, height: width }}
     />

      {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            justifyContent: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparent background
          }}
        >
          <ActivityIndicator
            size="large"
            color="#FBD148"
            style={{ marginTop: 20 }}
          />
        </View>
      )}
       <Text styles={styles.text}>One Time Password</Text>
   <CustomInputs 
    mode="outlined"
    label="One Time Password"
    placeholder="OTP"
    onChangeText={(e) => setOtp(e)}
  />
   <TouchableOpacity onPress={SubmitOTP}>
     <CustomButton
     mode="elevated" 
     text="Submit" />
     </TouchableOpacity>
 </View>
  )
}
const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    backgroundColor:'white',
    width:'100%',
    height:'100%',
},
circle: {
  position: 'absolute',
  top: -110,
  left: -15,
  width: 224,
  height: 216,
  borderRadius: 110,
  backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
},
circle2: {
  position: 'absolute',
  top: -30,
  left: -100,
  width: 224,
  height: 216,
  borderRadius: 110,
  backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
},
logo:{
    marginTop:"50%",
    maxWidth:500,
    maxHeight: 400,
    width:'70%',
    marginVertical:20,
},
forgot:{
    fontSize:16,
    color:'#EF5757',
    marginVertical:10
},
text:{
fontFamily:'poppins',
fontSize:14,
color:'black',
marginVertical:'20%',
letterSpacing:1.5,
}
   
});
export default OTPscreen