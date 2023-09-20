import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Result = () => {
  const [userStress, setUserStress] = useState([]); // Initialize userStress with 0

  useEffect(() => {
    // Fetch the stress value from your backend API
    const fetchStressValue = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Get the user ID from AsyncStorage
        const response = await fetch(`https://mindmatters-ejmd.onrender.com/stress/${userId}`);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const totalStressValue = data[0].total_stress_value;
        setUserStress(totalStressValue);
      } catch (error) {
        console.error('Failed to fetch stress value:', error);
      }
    };

    fetchStressValue(); // Call the function to fetch stress value when the component mounts
  }, []);

  // Data for the Pie Chart
  const pieChartData = [
    { name: "Depression", score: 42, color: "yellow" }, // You can set the score as needed
    { name: "Anxiety", score: 42, color: "orange" }, // Example score, update as needed
    { name: "Stress", score: userStress, color: "red" }, // Use the fetched stress value
  ];

  return (
    <View style={styles.container}>
      {/* Add the PieChart component */}
      <Text style={styles.chartTitle}>Mental Health Assessment Result</Text>
      <PieChart
        data={pieChartData}
        width={width}
        height={250}
        chartConfig={{
          backgroundColor: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="score"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Text style={styles.chartTitle}>This is the result of your Mental Health Assessment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Result;
