
import React from 'react'
import { View, Text ,Image, StyleSheet, Dimensions,ToastAndroid} from 'react-native'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const {width,height} = Dimensions.get('window');
const ForgotScreen = () => {
    const navigation = useNavigation();
   

    const SubmitEmail = async () => {
      try {
        const response = await axios.post('http://your-server-url/forgot', {
          email: email, // Pass the email to the server
        });
  
        // Check the response message from the server
        if (response.data.message === 'exists') {
          ToastAndroid.show('Email exists', ToastAndroid.SHORT);
          navigation.navigate('OTP');
        } else {
          ToastAndroid.show('Email does not exist', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        ToastAndroid.show('Error submitting email', ToastAndroid.SHORT);
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
      <CustomInputs 
       mode="outlined"
       label="Email"
       placeholder="Enter Email"
       onChangeText={(e) => setUsername(e)}
     />
        <CustomButton
        onPress={SubmitEmail} 
        mode="elevated" 
        text="Submit" />
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