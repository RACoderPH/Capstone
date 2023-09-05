
import React from 'react'
import { View, Text ,Image, StyleSheet, useWindowDimensions,ToastAndroid} from 'react-native'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../../assets/images/Mindmatters.png'
const ForgotScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();

    const SubmitEmail = () =>{
        ToastAndroid.show('Submit Email',ToastAndroid.SHORT);
    }
  return (
        <View style={styles.root}>
       <View style={styles.circle} />
       <View style={styles.circle2} />
      <Image source={Logo} style={[styles.logo, {height:height * 0.3}]}  resizeMode='contain'/>
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