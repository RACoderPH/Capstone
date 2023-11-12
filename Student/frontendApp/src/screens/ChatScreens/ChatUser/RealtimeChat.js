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


import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { storage, store } from "../../../firebase";



const { width, height } = Dimensions.get('window');
const socket = io.connect('https://mindmatters-ejmd.onrender.com/');

const RealtimeChat = () => {
  const [userData, setUserData] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');


  const chatsRef = collection(store, "Messages")

  useEffect(()=>{

    const q = query(chatsRef , orderBy('createdAt' , 'asc'))
  
    const unsub = onSnapshot(q, (querySnapshot) =>{
      const fireChats =[]
      querySnapshot.forEach(doc => {
        fireChats.push(doc.data())
      });
     setMessageList([...fireChats])
    })
    return ()=> {
      unsub()
    }
  
  },[])

  function addToFirebase(messageData) {
  
    const newChat = {
      createdAt: messageData.time,
      user: messageData.author,
      message: messageData.message,
      room: room,
    };
  
    const chatRef = doc(chatsRef);
    setDoc(chatRef, newChat)
      .then(() => console.log('Chat added successfully'))
      .catch(console.error);
  }
  

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
      const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = now.getDate().toString().padStart(2, '0');
    const hours24 = now.getHours();
    const hours12 = (hours24 % 12) || 12; // Convert to 12-hour format
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time: `${year}-${month}-${day} ${hours12}:${minutes}:${seconds} ${ampm}`,
      sentByUser: true,
    };

  
      console.log("Sending message:", messageData); 
      // Add the message to Firebase
      await addToFirebase(messageData);
  
      // Send the message through socket.io
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
  data={messageList.filter((message) => message.room === room)}
  keyExtractor={(item, index) => index.toString()}
  inverted={false}
  renderItem={({ item }) => {
    const isSentMessage = item.user === username; // Check if the message is sent by the user

    return (
      <View
        style={[
          styles.messageContainer,
          isSentMessage ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.from}>
          {item.user}, {item.createdAt}
        </Text>
      </View>
    );
  }}
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
    backgroundColor: 'gray',
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
