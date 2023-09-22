import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Result = () => {
    const [userStress, setUserStress] = useState(0);
    const [userAnxiety, setUserAnxiety] = useState(0);
    const [userDepression, setUserDepression] = useState(0);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = await AsyncStorage.getItem('id');
  
          // Fetch Stress data
          const stressResponse = await fetch(`http://192.168.1.83:5000/stress/${userId}`);
          if (stressResponse.ok) {
            const stressData = await stressResponse.json();
            setUserStress(parseInt(stressData[0]?.total_stress_value) || 0);
          }
  
          // Fetch Anxiety data
          const anxietyResponse = await fetch(`http://192.168.1.83:5000/anxiety/${userId}`);
          if (anxietyResponse.ok) {
            const anxietyData = await anxietyResponse.json();
            setUserAnxiety(parseInt(anxietyData[0]?.total_anxiety_value) || 0);
          }
  
          // Fetch Depression data
          const depressionResponse = await fetch(`http://192.168.1.83:5000/depression/${userId}`);
          if (depressionResponse.ok) {
            const depressionData = await depressionResponse.json();
            setUserDepression(parseInt(depressionData[0]?.total_depress_value) || 0);
          }
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    // Data for the Pie Chart
    const pieChartData = [
      { name: "Depression", score: userDepression, color: "yellow" },
      { name: "Anxiety", score: userAnxiety, color: "orange" },
      { name: "Stress", score: userStress, color: "red" },
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
