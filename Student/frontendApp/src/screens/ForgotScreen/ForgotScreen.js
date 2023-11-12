
import React ,{useState}from 'react'
import { View, Text ,Image, StyleSheet, Dimensions,ToastAndroid, TouchableOpacity,Alert,ActivityIndicator} from 'react-native'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get('window');
const ForgotScreen = () => {
    const [Email,setEmail] = useState("");
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false); 


    const SubmitEmail = async () => {

      if(Email.trim() === ""){
        Alert.alert('Forgot Password', 'Please input your Email');
      }else{
        setIsLoading(true);
        try {
          const response = await axios.post('https://mindmatters-ejmd.onrender.com/forgot', {
            email: Email, // Pass the email to the server
          });
      
          // Check the response status
          if (response.status === 200) {
            
                console.log(response.data.message);
            if (response.data.message === 'exists') {
              setIsLoading(false); 
              ToastAndroid.show('Email exists', ToastAndroid.SHORT);
              await AsyncStorage.setItem('userEmail', Email);
              navigation.navigate('otp');
            } else {
              Alert.alert('Forgot Password', "Email Doesn't exist");
            }
          } else {
            ToastAndroid.show('Error: Unexpected server response', ToastAndroid.SHORT);
          }
        } catch (error) {
          ToastAndroid.show('Network error', ToastAndroid.SHORT);
        }
      }
    };
    
    

  return (
      <View style={styles.root}>
       <View style={styles.circle} />
       <View style={styles.circle2} />

       <LottieView
          source={require('../../../assets/animation/forgot.json')}
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

          <Text>Forgot Password</Text>
      <CustomInputs 
       mode="outlined"
       label="Email"
       placeholder="Enter Email"
       onChangeText={(e) => setEmail(e)}
     />
      <TouchableOpacity onPress={SubmitEmail} >
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
export default ForgotScreen