import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import axios from 'axios';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const JournalScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user_id, setUserId] = useState('');
  const [insertMessage, setInsertMessage] = useState('');

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

    // Make a POST request to the backend API using Axios
    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        // Handle the response from the backend
        setInsertMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      });
  };

  return (
    <ScrollView
      style={{ height: height * 1, width: width * 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text
          style={{
            color: 'black',
            marginTop: height * 0.04,
            alignSelf: 'flex-start',
            marginLeft: width * 0.05,
            fontSize: 20,
            fontWeight: '400',
          }}
        >
          How was your day?
        </Text>
        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
          <TextInput
            label="Title"
            multiline
            onChangeText={(text) => setTitle(text)}
            style={{ width: width * 0.98, minHeight: 90, margin: 10 }}
          />
          <TextInput
            label="Type here...."
            multiline
            onChangeText={(text) => setDescription(text)}
            style={{ width: width * 0.98, minHeight: 200, margin: 10 }}
          />
        </View>
        <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
          <TouchableOpacity onPress={handleInsertData}>
            <CustomButton text="Entry" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height,
    padding: 10,
    justifyContent: 'space-between', // Pushes the button to the bottom
  },
});

export default JournalScreen;
