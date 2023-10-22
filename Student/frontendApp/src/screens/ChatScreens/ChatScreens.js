import { View, Text,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

import ChatUser from './ChatUser';
import axios from 'axios'; // Import axios
import ChatAiBot from './ChatAiBot';

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
    <View style={{width:width*1,height:height}}>
    {userdata.length > 0 ? (
      userdata.map((user, index) => (
        <View key={index} style={{width:width,height:height}}>
          {user.status === 'online' ? (
            // Render the ChatScreen when status is 'online'
            <ChatUser />
          ) : (
            // Render the status text when status is 'offline'
           <ChatAiBot/>
          )}
        </View>
      ))
    ) : (
      <Text style={{justifyContent:'center',textAlign:'center',fontSize:25}}>Wait a moment</Text>
    )}
  </View>
  );
}

export default ChatScreens;
