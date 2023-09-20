import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
const { width } = Dimensions.get('window');

const Question = () => {
  const [userData, setUserData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [userId, setUserId] = useState(""); // Set the user ID
  const [category, setCategory] = useState(""); // Set the category

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.83:5000/Questions');
        setUserData(response.data);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch the user_id from AsyncStorage when the component mounts
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
  }, []); // Make sure to run this effect only once when the component mounts

  const handleRadioChange = (questionId, value) => {
    setSelectedValues({
      ...selectedValues,
      [questionId]: value,
    });
  };

  const constructAnswers = () => {
    const answers = [];

    for (const questionData of userData) {
      const questionId = questionData.Question_id;

      answers.push({
        user_id: userId, // Use the user_id from state
        category: questionData.category,
        question_id: questionId,
        answer_value: selectedValues[questionId],
      });
    }

    return answers;
  };

  const submitAnswers = async () => {
    try {
      const answers = constructAnswers();

      const response = await axios.post('https://mindmatters-ejmd.onrender.com/submit_answer', {
        answers,
      });

      console.log('Answers submitted successfully:', response.data);
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  const renderRadioButtons = (questionData) => {
    const questionId = questionData.Question_id;

    return (
      <View style={styles.radioGroup}>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={0}
            status={selectedValues[questionId] === 0 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(questionId, 0)}
          />
          <Text style={{fontSize:10}}>{questionData.option1}</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={1}
            status={selectedValues[questionId] === 1 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(questionId, 1)}
          />
          <Text style={{fontSize:10}}>{questionData.option2}</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={2}
            status={selectedValues[questionId] === 2 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(questionId, 2)}
          />
          <Text style={{fontSize:10}}>{questionData.option3}</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value={3}
            status={selectedValues[questionId] === 3 ? 'checked' : 'unchecked'}
            onPress={() => handleRadioChange(questionId, 3)}
          />
          <Text style={{fontSize:10}}>{questionData.option4}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {userData.length > 0 ? (
        userData.map((questionData, index) => (
          <Card
            key={index}
            style={{ width: width * 0.97, alignSelf: 'center', marginTop: 20 }}
          >
            <Card.Content>
              <Text variant="titleMedium" style={{textAlign:'justify'}}>{questionData.Question}</Text>
              {renderRadioButtons(questionData)}
              <Text variant="bodyMedium" style={{display:'none'}}>Selected Value: {selectedValues[questionData.Question_id]}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>No questions available.</Text>
      )}
      <TouchableOpacity onPress={submitAnswers}>
        <CustomButton text="Submit" style={{ marginBottom:30,alignSelf:'center' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    width: width * 1,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
  },
  radioOption: {
    alignItems: 'center',
    marginBottom: 1,
    margin: 4,
  },
});

export default Question;
