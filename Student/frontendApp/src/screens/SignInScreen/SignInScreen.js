import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/images/Mindmatters.png';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const onSignInPressed = () => {
    if (username.trim() === '' || password.trim() === '') {
      ToastAndroid.show('Please Enter Username and Password', ToastAndroid.SHORT);
      return;
    } else {
      axios
        .post('https://mindmatters-ejmd.onrender.com/login/app', {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data.message);
          if (response.data.message === 'User found') {
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('id', response.data.id.toString());
            setUsername(''); // Clear the username input
            setPassword(''); // Clear the password input
            setIsSubmitted(true);
            navigation.navigate('Started');
          } else {
            ToastAndroid.show('User not Exist', ToastAndroid.SHORT);
          }
        });
    }
  };

  const onForgot = () => {
    navigation.navigate('Forgot');
  };

  const onCreate = () => {
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior as per your requirements
      enabled
    >
      <View style={styles.circle} />
      <View style={styles.circle2} />
      <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
      <CustomInputs mode="outlined" label="Username" placeholder="Enter Username" onChangeText={(e) => setUsername(e)} />
      <CustomInputs
        mode="outlined"
        label="Password"
        placeholder="Enter Password"
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
      />
      <Text style={styles.forgot} onPress={onForgot}>
        Forgot Password
      </Text>
      <TouchableOpacity onPress={onSignInPressed} disabled={isSubmitted}>
        <CustomButton mode="elevated" text="Sign in" />
      </TouchableOpacity>
      <Text style={styles.text}>
        Don't have an Account?
        <Text style={{ color: '#59C4CB' }} onPress={onCreate}>
          {' '}
          Create one
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1, // Use flex: 1 to allow the view to expand to fill the screen
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    top: -110,
    left: -15,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  circle2: {
    position: 'absolute',
    top: -30,
    left: -100,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  logo: {
    maxWidth: 500,
    maxHeight: 400,
    width: '70%',
    marginVertical: 50,
  },
  forgot: {
    fontSize: 16,
    color: '#EF5757',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: 'black',
    marginVertical: '20%',
    letterSpacing: 1.5,
  },
});

export default SignInScreen;
