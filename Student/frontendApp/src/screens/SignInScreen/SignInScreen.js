import { View, Text ,Image, StyleSheet, useWindowDimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/images/Mindmatters.png'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const SignInScreen = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const navigation = useNavigation();
    //BTN Function
    const onSignInPressed = () =>{
          axios.post ('http://192.168.1.83:5000/login/app',{
            username:username,
            password:password,
          }).then((response) => {
            console.log(response);

          if(response.data.message === 'User found'){
            const userId = response.data.id
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('id', userId);

            navigation.navigate('Homes');
            
            console.log(AsyncStorage.getItem('username'))
          }
          else
          {
            console.error('User not Exist');
          }
          });
    };

    const onForgot = () =>{
      console.warn('Forgot');
    };

    const onCreate = () =>{
      //console.warn('Sign Up');

      navigation.navigate('SignUp');
    };

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height:height * 0.3}]}  resizeMode='contain'/>
      <CustomInputs 
       
       mode="outlined"
       label="Username"
       placeholder="Enter Username"
       onChangeText={(e) => setUsername(e)}
     />
      <CustomInputs
       mode="outlined"
       label="Password"
       placeholder="Enter Password"
       onChangeText={(e) => setPassword(e)}
       secureTextEntry={true}/>
        <Text style={styles.forgot} onPress={onForgot}>Forgot Password</Text>
        
        <CustomButton 
        onPress={onSignInPressed}
        mode="elevated" 
        text="Sign in" />

        <Text style={styles.text}>Don't have an Account?<Text style={{color:'#59C4CB'}} onPress={onCreate}> Create one</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
        root:{
            alignItems:'center',
            padding: 20,
        },
        logo:{
            maxWidth:500,
            maxHeight: 400,
            width:'70%',
            marginVertical:50,
        },
        forgot:{
            fontSize:16,
            color:'#EF5757',
            marginVertical:10
        },
        text:{
        fontFamily:'poppins',
        fontSize:14,
        marginVertical:'30%',
        letterSpacing:1.5,
        }
});

export default SignInScreen