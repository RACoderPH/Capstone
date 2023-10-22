import React, { useState, useCallback, useEffect } from 'react'
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
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios';
import LottieView from 'lottie-react-native';
import ChatSplash from '../../ChatAiSplash/ChatSplash';
const {width,height} = Dimensions.get('window');

const ChatAiBot = () => {
  const [messages, setMessages] = useState([])

  const chat_gpt_api = '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';

  const handleSend = async (newMessages = []) => {
    try {
      if (newMessages.length === 0) {
        return; // No messages to send
      }
  
      const userMessage = newMessages[0];
      if (!userMessage || !userMessage.text) {
        return; // Invalid user message
      }
  
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
      const messageText = userMessage.text.toLowerCase();
      const keywords = ['depression', 'anxiety', 'stress','mental health','sleep','hard to sleep',
      'psychiatry','psychology','therapy/counceling','suicide','stigma',
      'self-care','medication','trauma','prevention','crisis intervention',
      'Psychiatrist','Well-being','Mindfulness','Mental illness','Mental health awareness',
      'wellness','emotional health','Resilence','Self-esteem','Psychologist','shame','abuse',
      'discrimination','isolation','humilation','physical torture','Pressure','creepy','Bipolar',
      'introvert','meditation','anxiety disorders','stress disorders','depression disorders'];
  
      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm your MiMa bot, ask me anything related to mental health",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'MiMa Bot'
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }
  
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-babbage-001/completions',
        {
          prompt: `Get me some advice for ${messageText}`,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${chat_gpt_api}`,
          },
        }
      );
  
      if (response && response.data && response.data.choices && response.data.choices.length > 0) {
        const information = response.data.choices[0].text.trim();
        const botMessage = {
          _id: new Date().getTime() + 2,
          text: information,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'MiMa Bot',
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
      }
    } catch (error) {
      console.error(error);
    }
  };


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Delay for 5 seconds (5000 milliseconds)
  }, []);


  if (isLoading) {
    return <ChatSplash/>;
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <View style={styles.header}>
      <LottieView
        source={require('../../../../assets/animation/chat-bot.json')}
        autoPlay
        loop
        style={styles.headerIcon}
      />
      <Text style={styles.headerText}>MiMa Bot</Text>
    </View>
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{
        _id: 1,
      }}
      placeholder="Type a message..."
    />
  </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:height,
    width:width,
    backgroundColor: 'white',
    paddingBottom:20,
    borderBottomWidth:0.5,
    borderBottomColor:'black',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:0.5,
    borderColor:'black',
    marginBottom: 5,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
});

export default ChatAiBot