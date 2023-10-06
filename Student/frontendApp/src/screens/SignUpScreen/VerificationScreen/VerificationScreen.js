import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import CustomInputs from '../../../components/CustomInputs/CustomInputs';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const VerificationScreen = () => {
  const navigation = useNavigation();
  const [verificationCodes, setVerificationCodes] = useState([]);
  const [code, setCode] = useState('');
  const [username, setUsername] = useState(''); // State to store the username

  useEffect(() => {
    // Fetch the verification code when the component mounts
    fetchVerificationCodes();

    // Retrieve the username from AsyncStorage
    retrieveUsername();
  }, []);

  const retrieveUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername !== null) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Failed to retrieve username from AsyncStorage:', error);
    }
  };

  const fetchVerificationCodes = () => {
    // Use the username as the ID for fetching user verification
    axios
      .get(`https://mindmatters-ejmd.onrender.com/verification?username=${username}`)
      .then((response) => {
        if (response.data) {
          setVerificationCodes(response.data);
          console.log(response.data);
        } else {
          console.error('No data or incorrect data structure in API response.');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch verification codes:', error);
      });
  };

  const SubmitEmail = () => {
    // Check if the entered code matches any of the verification codes
    console.log(code);
    const enteredCode = code.trim().toLowerCase(); // Convert entered code to lowercase for case-insensitive comparison
    const isCodeMatched = verificationCodes.includes(enteredCode);
  
    if (isCodeMatched) {
      ToastAndroid.show('Verification Successful', ToastAndroid.SHORT);
      navigation.navigate('SignIn');
    } else {
      ToastAndroid.show('Verification Failed', ToastAndroid.SHORT);
    }
  };
  

  return (
    <View style={styles.root}>
      <View style={styles.circle} />
      <View style={styles.circle2} />
      <View
        style={{
          width: width,
          height: height,
          alignItems: 'center',
          marginVertical: 60,
        }}
      >
        <LottieView
          source={require('../../../../assets/animation/verification.json')}
          autoPlay
          loop
          style={{ width: width, height: width }}
        />
        <Text style={{ color: 'black', fontSize: 20 }}>Verification Code</Text>
        <CustomInputs
          mode="outlined"
          label="Code"
          placeholder="Enter Email"
          onChangeText={(e) => setCode(e)}
        />
        <TouchableOpacity onPress={SubmitEmail}>
          <CustomButton mode="elevated" text="Submit" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width,
    height: height,
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
    marginTop: '50%',
    maxWidth: 500,
    maxHeight: 400,
    width: '70%',
    marginVertical: 20,
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

export default VerificationScreen;
