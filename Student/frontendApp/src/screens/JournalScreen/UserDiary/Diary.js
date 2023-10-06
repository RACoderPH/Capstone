import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import {
    Card,
     Text,
      } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Diary = () => {
  const navigation = useNavigation();
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const userId = await AsyncStorage.getItem('id');
      // Fetch diary entries from your backend API using the retrieved userId
      axios
        .get(`https://mindmatters-ejmd.onrender.com/MyDiary/${userId}`) // Replace with your API URL and user ID
        .then((response) => {
          // Set the retrieved data to the state
          setDiaryEntries(response.data);
        })
        .catch((error) => {
          console.error('Error fetching diary entries:', error);
        });
    };
  
    fetchDiaryEntries(); // Call the async function to fetch diary entries
  }, []); // Run this effect only once, when the component mounts
  
  const renderDiaryEntries = () => {
    return diaryEntries.map((entry) => (
    <View style={{margin:5}}>
      <MyComponent key={entry.id} entry={entry} />
      </View>
    ));
  };
  
  const MyComponent = ({ entry }) => (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{entry.title}</Text>
        <Text variant="bodySmall">{entry.date}</Text>
        <Text variant="bodyMedium">{entry.description}</Text>
      </Card.Content>
    </Card>
  );

  const MyComponent2 = () => (
    <Card style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
      <Card.Content>
      <Icon name='add-outline' style={{ fontSize: 30 }} />
      </Card.Content>
    </Card>
  );

    const Add = () => {
       navigation.navigate('Journal');
    }
  return (
    <ScrollView style={styles.container}>
       
      <View style={{ width: '100%', height: '100%', padding: 10 }}>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            textAlign: 'center',
            fontSize: 30,
            padding: 15,
          }}
        >
          My Diary
        </Text>
        {renderDiaryEntries()}
        <TouchableOpacity onPress={Add}> 
        <MyComponent2/>
        </TouchableOpacity>
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});

export default Diary;
