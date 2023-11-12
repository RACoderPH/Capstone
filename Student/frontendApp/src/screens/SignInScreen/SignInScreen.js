import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/images/school_logo.png';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const {width,height} = Dimensions.get('window');
const apiUrl = 'https://mindmatters-ejmd.onrender.com';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const navigation = useNavigation();

  const onSignInPressed = () => {
    if (username.trim() === '' || password.trim() === '') {
      ToastAndroid.show('Please Enter Username and Password', ToastAndroid.SHORT);
      return;
    } else {
      setIsLoading(true); // Show the activity indicator

      axios
        .post(`${apiUrl}/login/app`, {
          username: username,
          password: password,
        })
        .then((response) => {
          setIsLoading(false); // Hide the activity indicator
          console.log(response.data.message);
          if (response.data.message === 'User found') {
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('id', response.data.id.toString());
            setUsername(''); // Clear the username input
            setPassword(''); // Clear the password input
            navigation.navigate('Started');
          } else {
            Alert.alert('Mind Matters', 'Please Check Username and Password');
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.circle} />
        <View style={styles.circle2} />
        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
        {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: '100%',
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
        <CustomInputs mode="outlined" label="Username" placeholder="Enter Username"  value={username} onChangeText={(e) => setUsername(e)} />
        <CustomInputs
          mode="outlined"
          label="Password"
          value={password}
          placeholder="Enter Password"
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
        />
        <Text style={styles.forgot} onPress={onForgot}>
          Forgot Password
        </Text>
        <TouchableOpacity onPress={onSignInPressed}>
          <CustomButton mode="elevated" text="Sign in" />
        </TouchableOpacity>
        <Text style={styles.text}>
          Don't have an Account?
          <Text style={{ color: '#59C4CB' }} onPress={onCreate}>
            {' '}
            Create one
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1, // This makes the content within ScrollView take up all available space
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    top: -110,
    left: -15,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)',
  },
  title:{
    fontFamily:'sans-serif',
    fontSize:32,
    letterSpacing:1.1,
    textAlign:'left',
    fontWeight:'600',
    color:'black',
    margin:10,
},
  circle2: {
    position: 'absolute',
    top: -30,
    left: -100,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)',
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
