import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions,TextInput,ScrollView ,KeyboardAvoidingView} from 'react-native';

import CustomButton from '../../components/CustomButton/CustomButton';

const {width,height} = Dimensions.get('window');
const JournalScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user_id, setUserId] = useState('');
  const [insertMessage, setInsertMessage] = useState('');

  const handleInsertData = () => {
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('id');
          if (storedUserId) {
            setUserId(storedUserId);
          }
        } catch (error) {
          console.error('Failed to fetch user_id from AsyncStorage:', error);
        }
      };
  
      fetchUserId();
    }, []);


    // Define the API URL
    const apiUrl = 'https://mindmatters-ejmd.onrender.com/AddDiary';
  
    // Create a request body with the data to insert
    const requestBody = {
      title: title,
      description: description,
      user_id: user_id,
    };
  
    // Make a POST request to the backend API using Axios
    axios.post(apiUrl, requestBody)
      .then((response) => {
        // Handle the response from the backend
        setInsertMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      });
  };
  
  

  return (
    <ScrollView style={{height:height * 1,width:width *1 }}
    keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
  
          <Text style={{color:'black',
          marginTop:height * 0.04,
          alignSelf:'flex-start',
          marginLeft:width* 0.05,fontSize:20,fontWeight:'400'}}>How was your day?</Text>
             <TextInput
    multiline={true}
    textAlignVertical="top"
    numberOfLines={4}
    value={title}
    onChangeText={(text) => setTitle(text)} // You can adjust the number of lines as needed
    style={{
      width:width * 0.9,
      borderWidth: 0.2,
      color:'black',
      fontWeight:'700',
      backgroundColor:'white',
      borderColor: 'gray',
      borderRadius:10,
      margin: 15,
      padding: 12,
      fontSize: 18,
      minHeight: 10,// Adjust the height as needed
    }}
  />
          <TextInput
    multiline={true}
    textAlignVertical="top"
    numberOfLines={4}
    value={description}
    onChangeText={(text) => setDescription(text)} // You can adjust the number of lines as needed
    style={{
      width:width * 0.9,
      borderWidth: 0.2,
      color:'black',
      backgroundColor:'white',
      borderColor: 'gray',
      borderRadius:10,
      margin: 15,
      padding: 12,
      fontSize: 14,
      minHeight: 200,
      letterSpacing:1,// Adjust the height as needed
    }}
  />
  <View style={{ flex: 1, justifyContent: 'flex-end' ,alignSelf:'center',marginBottom:height * 0.05}}>
          <CustomButton text="Entry" style={{
            width: width * 0.9,
            borderRadius: width * 0.03,
            fontSize: width * 0.04,
          }} />
        </View>
    </View>
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
      width:width,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      height:height * 1,
     
  }
});

export default JournalScreen;
