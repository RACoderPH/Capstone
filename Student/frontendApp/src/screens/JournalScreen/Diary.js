import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import AddDiary from '../JournalScreen/Journal/JournalScreen';
import UserDiary from '../JournalScreen/UserDiary/Diary';

const Diary = () => {
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

    fetchDiaryEntries();
  }, []);

  // Check the length of diaryEntries to conditionally render components
  return (   
    diaryEntries.length > 0 ? <UserDiary /> : <AddDiary />
  );
};

export default Diary;
