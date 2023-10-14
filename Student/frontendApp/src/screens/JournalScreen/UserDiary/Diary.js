import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text, BackHandler } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Diary = () => {
  const navigation = useNavigation();
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const userId = await AsyncStorage.getItem('id');
      // Fetch all diary entries from your backend API using the retrieved userId
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

    // Add a back button handler
    const backAction = () => {
      navigation.goBack(); // Navigate back to the homepage
      return true; // Return true to prevent default behavior (app exit)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); 


  }, [navigation]); // Run this effect only once, when the component mounts

  const MyComponent = ({ entry }) => (
    <View style={styles.componentContainer}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{entry.title}</Text>
        </Card.Content>
      </Card>
    </View>
  );

  const MyComponent2 = () => (
    <View style={styles.componentContainer}>
      <Card style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Card.Content>
          <Icon name="add-outline" style={{ fontSize: 30 }} />
        </Card.Content>
      </Card>
    </View>
  );

  const Add = () => {
    navigation.navigate('UserDiary');
  };


  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            textAlign: 'center',
            fontSize: 30,
            paddingBottom: 15,
          }}
        >
          My Diary
        </Text>
        {diaryEntries.map((entry) => (
          <MyComponent key={entry.id} entry={entry} />
        ))}
        <TouchableOpacity onPress={Add}>
          <MyComponent2 />
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
  contentContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  componentContainer: {
    marginBottom: 15,
  },
});

export default Diary;
