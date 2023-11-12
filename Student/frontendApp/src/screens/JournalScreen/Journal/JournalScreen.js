import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton/CustomButton';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const JournalScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user_id, setUserId] = useState('');
  const [insertMessage, setInsertMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');
        if (storedId) {
          setUserId(storedId);
        }
      } catch (error) {
        console.error('Failed to fetch user_id from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []); // Run this effect only once, when the component mounts

  const handleInsertData = () => {
    // Define the API URL
    const apiUrl = 'https://mindmatters-ejmd.onrender.com/AddDiary';

    // Create a request body with the data to insert
    const requestBody = {
      title: title,
      description: description,
      user_id: user_id,
    };
    if (title.trim() === '' || description === '') {
      Alert.alert('Blank Field', 'Please fill out the field');
    } else {
      axios
        .post(apiUrl, requestBody)
        .then((response) => {
          // Handle the response from the backend
          setInsertMessage(response.data.message);
          setTitle('');
          setDescription('');
          navigation.navigate('Diary');
        })
        .catch((error) => {
          console.log('Error inserting data:', error);
        });
    }
    // Make a POST request to the backend API using Axios
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        <View  style={styles.scrollView}>
        <Text style={styles.titleText}>How was your day?</Text>
        <ScrollView style={{ maxHeight: 90 }}>
          <TextInput
            label="Title"
            placeholder='Diary Title'
            multiline
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
           </ScrollView>
            <ScrollView style={{ maxHeight: 200}}>
          <TextInput
           placeholder='Type here'
            multiline
            onChangeText={(text) => setDescription(text)}
            style={styles.input2}
          />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleInsertData}>
              <CustomButton text="Entry" />
            </TouchableOpacity>
          </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: '100%',
    width: width,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:20,
  },
  inputContainer: {
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: width * 0.90,
    minHeight: 50,
    margin: 10,
    backgroundColor:'white',
    marginBottom:20,
  },
  input2: {
    width: width * 0.90,
    minHeight: 90,
    margin: 10,
    backgroundColor:'white',
  },
  buttonContainer: {
    alignItems: 'center', // Center the button horizontally
  },
});

export default JournalScreen;
