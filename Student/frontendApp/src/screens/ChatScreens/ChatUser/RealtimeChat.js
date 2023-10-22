import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const socket = io.connect('http://192.168.1.83:5000/');

const RealtimeChat = () => {
  const [userData, setUserData] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  // Get fetch user
  const retrieveData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${storedId}`);
      setUserData(response.data);

      // Automatically join the room after fetching user data
      joinRoom(response.data.room_id);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('username').then((value) => {
      if (value) {
        setUsername(value);
      }
    });
    const handleReceiveMessage = (data) => {
      // Check if the room of the incoming message matches the current room ID
      if (data.room === room) {
        
        data.sentByUser = false;
        setMessageList((list) => [...list, data]);
     
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [room]);

  const joinRoom = (room_id) => {
    if (room_id !== '') {
      setRoom(room_id);
      socket.emit('join_room', room_id);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== '' && room && username && socket) {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().getHours() + ':' + new Date().getMinutes(),
        sentByUser: true,
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);

      setCurrentMessage('');
    } else {
      console.log('Room, currentMessage, username, or socket is null');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
   <FlatList
  data={messageList} 
  keyExtractor={(item, index) => index.toString()}
  inverted={false} // Set inverted to true to start messages at the bottom
  renderItem={({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sentByUser ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.from}>
        {item.author}, {item.time}
      </Text>
    </View>
  )}
/>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={currentMessage}
          onChangeText={(text) => setCurrentMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'white',
  },
  messageContainer: {
    borderRadius: 5,
    padding: 5,
    margin: 10,
    marginBottom: 8,
  },
  sentMessage: {
    backgroundColor: '#DFDFDF',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#3AB0FF', // Change to the desired background color
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  inputContainer: {
    width: width * 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 1,
    marginRight: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    padding: 15,
    backgroundColor: '#0084ff',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  from: {
    fontSize: 12,
    color: 'white',
    fontWeight: '300',
  },
});

export default RealtimeChat;
