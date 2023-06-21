import { View,
   Text ,
   Image, 
   StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import Logo from '../../../assets/images/Mindmatters.png'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const SignUpScreen = () => {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');
    const [StudID, setStudID] = useState('');
    const navigation = useNavigation();
    //BTN Function
    const onSignInPressed = () =>{
      if(password !== Cpassword){
        console.warn('Password not same');
    }
    else{
      axios.post('http://192.168.1.83:5000/register/app', {
        username: Username,
        email: Email,
        password: password,
      })
        .then((response) => {
          console.log(response);
          // Check the response for the status code indicating username already exists
          if (response.data.message === 'Username already exists') {
           console.warn('User Already Exist');
          }else if(response.data.message === 'User registered successfully'){
            navigation.navigate('SignIn');
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle other error scenarios if needed
        });
    }
    };
    const onCreate = () =>{
      navigation.navigate('SignIn');
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.root}>
    <Text style={styles.title}>Create an account</Text>
    <CustomInputs 
    onChangeText={(e) => setUsername(e)}
     mode="outlined"
     label="Username"
     placeholder="Enter Username"
   />
<CustomInputs 
    onChangeText={(e) => setEmail(e)}
     mode="outlined"
     label="Email"
     placeholder="Enter Email"
   />
   <CustomInputs 
     mode="outlined"
     label="Student ID"
     placeholder="Enter Student ID"
   />
<CustomInputs
    onChangeText={(e) => setPassword(e)}
     mode="outlined"
     label="Password"
     placeholder="Enter Password"
     secureTextEntry={true}/>


<CustomInputs
     onChangeText={(e) => setCPassword(e)}
     mode="outlined"
     label="Confirm Password"
     placeholder="Enter Confirm Password"
     secureTextEntry={true}/>    

<CustomButton 
      onPress={onSignInPressed}
      style={styles.btn}
      mode="elevated" 
      text="Register"
      labelStyle={{ color: 'white' ,fontWeight:'bold',fontSize:20}}
      />

      <Text style={styles.text}>Already have an account?<Text style={{color:'#59C4CB'}} onPress={onCreate}> Sign In</Text></Text>
  </View>
    </ScrollView>

   
  )
}
const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        padding: 20,
        marginVertical:60,
    },
    forgot:{
        fontSize:16,
        color:'#EF5757',
        marginVertical:10
    },
    text:{
    fontFamily:'poppins',
    fontSize:14,
    marginVertical:'10%',
    letterSpacing:1.5,
    },
    title:{
        fontFamily:'poppins',
        fontSize:30,
        letterSpacing:1.5,
        marginVertical:5,
        fontWeight:'bold',
        color:'black',
        margin:10,
    },
    btn:{
        marginVertical:50,
       
    }
});

export default SignUpScreen