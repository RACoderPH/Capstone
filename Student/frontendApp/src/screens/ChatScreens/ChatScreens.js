import { View, Text,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatBot from './Chatbot/ChatBot'
import ChatUser from './ChatUser';
import axios from 'axios'; // Import axios

const {width,height} = Dimensions.get('window');
const ChatScreens = () => {
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mindmatters-ejmd.onrender.com/admin');
        setUserdata(response.data);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{width:width*1}}>
    {userdata.length > 0 ? (
      userdata.map((user, index) => (
        <View key={index}>
          {user.status === 'online' ? (
            // Render the ChatScreen when status is 'online'
            <ChatUser />
          ) : (
            // Render the status text when status is 'offline'
            <ChatBot />
          )}
        </View>
      ))
    ) : (
      <Text>Loading user data...</Text>
    )}
  </View>
  );
}

export default ChatScreens;
