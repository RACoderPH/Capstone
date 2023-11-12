import React, { useState,useEffect } from 'react';
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
  ActivityIndicator
} from 'react-native';
import CustomInputs from '../../../components/CustomInputs/CustomInputs';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const DeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null); // State to store the user ID

  useEffect(() => {
    // Retrieve the user ID from AsyncStorage when the component mounts
    async function fetchUserId() {
      try {
        const storedUserId = await AsyncStorage.getItem('id'); // Replace with your actual key
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error retrieving user ID from AsyncStorage:', error);
      }
    }

    fetchUserId();
  }, []);


  const DeletionAccount = () => {
    if(password.trim() === ''){
          Alert.alert('Blank Field','Please enter your Password');
    }else{

    
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            // Handle cancel action if needed
            console.log('Account deletion canceled');
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            SureDelete(); // Call the SureDelete function
          },
        },
      ]
    );
    }
  };

  const SureDelete = () => {
    setIsLoading(true);
  
    // Create a data object with the password to be sent in the request body
    const data = { password };
  
    axios
      .delete(`https://mindmatters-ejmd.onrender.com/DeleteAccount/${userId}`, {
        data, // Send the password in the request body
      })
      .then(response => {
        setIsLoading(false);
        navigation.navigate('SignIn');
        console.log('User account deleted successfully:', response.data);
        // You can perform additional actions after successful deletion here
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Error deleting user account:', error);
        // Handle the error here, e.g., show an error message to the user
      });
  };
  

  return (
    <KeyboardAvoidingView style={styles.root} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior as per your requirements
    enabled>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
        <View style={styles.circle} />
        <View style={styles.circle2} />

        <LottieView
          source={require('../../../../assets/animation/verification.json')}
          autoPlay
          loop
          style={{ width: width, height: width }}
        />
        <Text style={styles.text}>Delete Account</Text>
        <Text style={styles.text2}>Deleting your account will remove all of your information from our database.This cannot be undone.</Text>
        <Text style={styles.text3}>To confirm this,type your "Account Password"</Text>
        <CustomInputs
          mode="outlined"
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
     
        <TouchableOpacity onPress={DeletionAccount}>
          <CustomButton mode="elevated" text="Delete Account" style={styles.btn}/>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
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
      fontSize: 22,
      color: 'black',
      fontWeight:'500',
      letterSpacing: 1.5,
    },
    text2: {
      fontFamily: 'poppins',
      fontSize: 14,
      padding:10,
      color: 'black',
      fontWeight:'600',
      letterSpacing: 0.5,
    },
    text3: {
      fontFamily: 'poppins',
      fontSize: 13,
      color: 'gray',
      fontWeight:'600',
      letterSpacing: 0.5,
    },
    btn:{
      backgroundColor:'#E25E3E',
    }
  });
export default DeleteUser