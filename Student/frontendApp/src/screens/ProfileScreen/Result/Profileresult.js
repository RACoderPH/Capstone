import { View, Text, Dimensions, StyleSheet, ActivityIndicator,Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const { width,height } = Dimensions.get('window');

const Profileresult = () => {
  const navigation = useNavigation();
    const [userStress, setUserStress] = useState(0);
    const [userAnxiety, setUserAnxiety] = useState(0);
    const [userDepression, setUserDepression] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [user,setUser] = useState ("");
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = await AsyncStorage.getItem('id');
          setUser(userId);
          // Fetch Stress data
          const stressResponse = await fetch(`https://mindmatters-ejmd.onrender.com/stress/${userId}`);
          if (stressResponse.ok) {
            const stressData = await stressResponse.json();
            setUserStress(parseInt(stressData[0]?.total_stress_value) || 0);
          }
  
          // Fetch Anxiety data
          const anxietyResponse = await fetch(`https://mindmatters-ejmd.onrender.com/anxiety/${userId}`);
          if (anxietyResponse.ok) {
            const anxietyData = await anxietyResponse.json();
            setUserAnxiety(parseInt(anxietyData[0]?.total_anxiety_value) || 0);
          }
  
          // Fetch Depression data
          const depressionResponse = await fetch(`https://mindmatters-ejmd.onrender.com/depression/${userId}`);
          if (depressionResponse.ok) {
            const depressionData = await depressionResponse.json();
            setUserDepression(parseInt(depressionData[0]?.total_depress_value) || 0);
          }

          setIsLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error('Failed to fetch data:', error);
          setIsLoading(false); // Set loading to false even on error
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
    const recommendation = () => {
        navigation.navigate('recommendation');
        console.log("No insertion");
    }

  return (
    <View style={styles.container}>
      {isLoading ? ( // Show loading indicator if isLoading is true
        <ActivityIndicator size="large" color="#0084ff" />
      ) : (
        <>
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
          <Text style={styles.chartTitle}>Equivalent Score of your Result</Text>
          <View style={{ width: "100%", padding: 5, flexDirection: 'row', justifyContent:'space-evenly' }}>
          <View style={{ backgroundColor:"#F7F7F7",width: "30%", height: 100, borderRadius: 50, margin: 10, borderWidth: 1, borderColor: "#F9D949", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:'black',}}>{userDepression}</Text>
          <Text style={{color:'black',}}>Depression</Text>
          </View>
          <View style={{ backgroundColor:"#F7F7F7",width: "30%", height: 100, borderRadius: 50, margin: 10, borderWidth: 1, borderColor: "#F9D949", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:'black',}}>{userAnxiety}</Text>
          <Text style={{color:'black',}}>Anxiety</Text>
          </View>
          <View style={{ backgroundColor:"#F7F7F7",width: "30%", height: 100, borderRadius: 50, margin: 10, borderWidth: 1, borderColor: "#F9D949", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:'black',}}>{userStress}</Text>
          <Text style={{color:'black',}}>Stress</Text>
        </View>
        </View>
        <View style={{ width: "100%", padding: 5, flexDirection: 'row', justifyContent:"space-evenly" }}>
        <Text>
          {userDepression >= 28
      ? "Extreme Severe"
      : userDepression >= 21
      ? "Severe"
      : userDepression >= 14
      ? "Moderate"
      : userDepression >= 10
      ? "Mild"
      : userDepression >= 0
      ? "Normal"
      : ''}
          </Text>

          <Text >
          {userAnxiety >= 20
      ? "Extreme Severe"
      : userAnxiety >= 15
      ? "Severe"
      : userAnxiety >= 10
      ? "Moderate"
      : userAnxiety >= 8
      ? "Mild"
      : userAnxiety >= 0
      ? "Normal"
      : ''}
          </Text>

          <Text >
          {userStress >= 34
      ? "Extreme Severe"
      : userStress >= 26
      ? "Severe"
      : userStress >= 19
      ? "Moderate"
      : userStress >= 15
      ? "Mild"
      : userStress >= 0
      ? "Normal"
      : ''}
          </Text>

          
        </View>
        <TouchableOpacity onPress={recommendation}>
            <CustomButton text="Next"/>
       </TouchableOpacity>
        </>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:width * 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  chartTitle: {
    fontSize: 18,
    textAlign:'center',
    color:'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image:{
    width:width * 0.95,
    borderWidth:0.5,
    borderRadius:10,
    borderColor:'black',
  }
});

export default Profileresult;
