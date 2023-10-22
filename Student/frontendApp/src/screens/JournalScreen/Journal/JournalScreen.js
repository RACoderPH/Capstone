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
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titleText}>How was your day?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Title"
            multiline
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          
          />
          <TextInput
            label="Type here...."
            multiline
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          
          />
        </View>

        <TouchableOpacity onPress={handleInsertData}>
          <CustomButton text="Entry" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow', // Background color set to light yellow
    padding:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: height * 1,
    width: width * 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: width * 0.98,
    minHeight: 90,
    margin: 10,
  },
});

export default JournalScreen;
