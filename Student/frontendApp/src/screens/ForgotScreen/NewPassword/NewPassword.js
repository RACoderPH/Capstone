import React ,{useState}from 'react'
import { View, Text ,Image, StyleSheet, Dimensions,ToastAndroid, TouchableOpacity} from 'react-native'
import CustomInputs from '../../../components/CustomInputs/CustomInputs';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

const {width,height} = Dimensions.get('window');
const NewPassword = () => {

    const [pass,setPass] = useState("");
    const [Cpass,setCpass] = useState("");
    const navigation = useNavigation();
  
  
    const OneTime = () => {
        navigation.navigate('SignIn');
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
       <Text styles={styles.text}>Reset Password</Text>
   <CustomInputs 
    mode="outlined"
    label="Password"
    placeholder="New Password"
    onChangeText={(e) => setPass(e)}
  />
   <CustomInputs 
    mode="outlined"
    label="Password"
    placeholder="Confirm Password"
    onChangeText={(e) => setCpass(e)}
  />
  

   <TouchableOpacity onPress={OneTime}>
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

export default NewPassword