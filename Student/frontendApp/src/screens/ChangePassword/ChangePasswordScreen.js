import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [pass, setPass] = useState("");
  const [Cpass, setCpass] = useState("");

  const profile = () => {
    navigation.navigate('Profile');
  };


  const isPasswordStrong = (password) => {
    // Define your password strength criteria (e.g., at least 8 characters, including numbers, uppercase, and lowercase letters)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };


  const changePassword = async () => {
    if (pass.trim() === "" || Cpass === "") {
      Alert.alert('Change Password', 'Please fill out the field');
    } 

    if (!isPasswordStrong(pass  )) {
      Alert.alert('Mind Matters', 'Password is not strong enough');
      return;
    }
    
      if (pass === Cpass) {
        try {
          // Retrieve the userEmail value from AsyncStorage
          const userId = await AsyncStorage.getItem('id');
          console.log(userId);
          // Make the API request with userEmail and newPassword
          const response = await axios.post('https://mindmatters-ejmd.onrender.com/ChangePasswordProfile', {
            userId: userId,
            newPassword: pass,
          });
          if (response.status === 200) {
            console.log(response.data.message);
            if (response.data.message === 'Password updated successfully') {
              Alert.alert(
                'Change Password',
                'Successfully Reset your Password',
                [
                  {
                    text: 'OK',
                    onPress: () => profile(),
                  },
                ],
                { cancelable: false }
              );
            } else {
              Alert.alert('Change Password', 'Password not reset');
            }
          } else {
            ToastAndroid.show('Error: Unexpected server response', ToastAndroid.SHORT);
          }
        } catch (error) {
          // Handle network error
          console.error('Network error:', error);
          return { success: false, message: 'Network error' };
        }
      } else {
        Alert.alert('Change Password', 'Password and Confirm Password not match');
      }
    
  };

  return (
    <KeyboardAvoidingView style={styles.root} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior as per your requirements
    enabled>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.circle} />
        <View style={styles.circle2} />

        <LottieView
          source={require('../../../assets/animation/verification.json')}
          autoPlay
          loop
          style={{ width: width, height: width }}
        />
        <Text style={styles.text}>Change Password</Text>
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
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(e) => setCpass(e)}
        />

        <TouchableOpacity onPress={changePassword}>
          <CustomButton mode="elevated" text="Submit" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    alignItems: 'center',
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
  forgot: {
    fontSize: 16,
    color: '#EF5757',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: 'black',
    fontWeight:'500',
    letterSpacing: 1.5,
  },
});

export default ChangePasswordScreen;
