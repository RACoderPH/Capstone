import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Question = () => {
  const [userData, setUserData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  // Fetch Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.83:5000/Questions'); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    };

    fetchData(); // Call the fetchData function to initiate the API request
  }, []);

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View>
      {userData.length > 0 ? (
        userData.map((questionData, index) => (
          <Card
            key={index}
            style={{ width: width * 0.9, alignSelf: 'center', marginTop: 20 }}
          >
            <Card.Content>
              <Text variant="titleLarge">{questionData.Question}</Text>
              <Text variant="bodyMedium">Choices</Text>
              <View style={styles.radioGroup}>
                <View style={styles.radioOption}>
                  <RadioButton.Android
                    value={0}
                    status={selectedValue === 0 ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioChange(0)}
                  />
                  <Text>Often</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton.Android
                    value={1}
                    status={selectedValue === 1 ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioChange(1)}
                  />
                  <Text>Sometimes</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton.Android
                    value={2}
                    status={selectedValue === 2 ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioChange(2)}
                  />
                  <Text>Maybe</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton.Android
                    value={3}
                    status={selectedValue === 3 ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioChange(3)}
                  />
                  <Text>This time</Text>
                </View>
              </View>
              <Text variant="bodyMedium">Selected Value: {selectedValue}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>No questions available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    width: width * 1,
    marginTop: 1,
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
