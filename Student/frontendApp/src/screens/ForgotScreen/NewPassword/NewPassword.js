import React ,{useState}from 'react'
import { View, Text ,Image, StyleSheet, Dimensions,ToastAndroid, TouchableOpacity,Alert} from 'react-native'
import CustomInputs from '../../../components/CustomInputs/CustomInputs';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const {width,height} = Dimensions.get('window');
const NewPassword = () => {

    const [pass,setPass] = useState("");
    const [Cpass,setCpass] = useState("");
    const navigation = useNavigation();
  
  
    const SignIn = () => {
        navigation.navigate('SignIn');
    }
    
    const changePassword = async () => {

      if(pass.trim() === "" || Cpass === ""){
          Alert.alert('Reset Password','Please Fill out the Field');
      }else{
          if(pass === Cpass){
            try {
              // Retrieve the userEmail value from AsyncStorage
              const userEmail = await AsyncStorage.getItem('userEmail');
              console.log(userEmail);
              // Make the API request with userEmail and newPassword
              const response = await axios.post('https://mindmatters-ejmd.onrender.com/ChangePassword', {
                userEmail: userEmail,
                newPassword: pass,
              });
                if(response.status === 200){
                  console.log(response.data.message);
                  if (response.data.message === 'Password updated successfully') {
                    Alert.alert(
                      'Reset Password',
                      'Successfully Reset your Password',
                      [
                        {
                          text: 'OK',
                          onPress: () => SignIn(),
                        },
                      ],
                      { cancelable: false }
                    );
      
                  }
                  else{
                    Alert.alert('Reset Password', 'Password not reset');
                  }
      
                }else {
                  ToastAndroid.show('Error: Unexpected server response', ToastAndroid.SHORT);
                }
            } catch (error) {
              // Handle network error
              console.error('Network error:', error);
              return { success: false, message: 'Network error' };
            }
          }else{
            Alert.alert('Reset Password','Password and Confirm Password Not match');
          }
      }
    };


    
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
       <Text styles={styles.text}>Reset Password</Text>
   <CustomInputs 
    mode="outlined"
    label="Password"
    placeholder="New Password"
    secureTextEntry={true}
    onChangeText={(e) => setPass(e)}
  />
   <CustomInputs 
    mode="outlined"
    label="Confirm Password"
    placeholder="Confirm Password"
    secureTextEntry={true}
    onChangeText={(e) => setCpass(e)}
  />
  

   <TouchableOpacity onPress={changePassword}>
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
      width:width,
      height:height,
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

export default NewPassword