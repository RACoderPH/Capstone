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

const { width, height } = Dimensions.get('window');
const socket = io.connect('https://mindmatters-ejmd.onrender.com/');

const RealtimeChat = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState('12345');
  const [username, setUsername] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('username').then((value) => {
      if (value) {
        setUsername(value);
      }
    });
    const handleReceiveMessage = (data) => {
      // Set sentByUser to false for received messages
      data.sentByUser = false;
      setMessageList((list) => [...list, data]);
    };
  
    socket.on("receive_message", handleReceiveMessage);
  
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  useEffect(() => {
    joinRoom();
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== '' && room && username && socket) {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().getHours() + ':' + new Date().getMinutes(),
        sentByUser: true, // Sent by the user
      };
  
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
  
      // Clear the input field
      setCurrentMessage('');
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
      <TextInput
        style={{ display: 'none' }}
        placeholder="Join room"
        value={room}
        onChangeText={(text) => setRoom(text)}
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
    height:height,
    backgroundColor: 'white',
  },
  messageContainer: {
    borderRadius: 5,
    padding: 5,
    margin:10,
    marginBottom: 8,
  },
  sentMessage: {
    backgroundColor: 'gray',
    alignSelf: 'flex-end', // Align to the right for user's own messages
  },
  receivedMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-start', // Align to the left for received messages
  },
  messageText: {
    fontSize: 16,
    fontWeight:'500',
    color: 'white', // Set text color for received messages
  },
  inputContainer: {
    width:width*1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 25   ,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    padding: 15,
    backgroundColor: '#0084ff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  from:{
    fontSize:12,
    color:'white',
    fontWeight:'300'
  }
});

export default RealtimeChat;
