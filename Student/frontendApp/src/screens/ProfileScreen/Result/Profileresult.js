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
    const [resultData, setResultData] = useState(null);





    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = await AsyncStorage.getItem('id');
          setUser(userId);

          const depressionResponse = await fetch(`https://mindmatters-ejmd.onrender.com/student_result/${userId}`);
          if (depressionResponse.ok) {
            const depressionData = await depressionResponse.json();
            setUserDepression(parseInt(depressionData[0]?.depression) || 0);
            setUserAnxiety(parseInt(depressionData[0]?.anxiety) || 0);
            setUserStress(parseInt(depressionData[0]?.stress) || 0);
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
      { name: "Depression", score: userDepression, color: "#D9534F" },
      { name: "Anxiety", score: userAnxiety, color: "#FFAD60" },
      { name: "Stress", score: userStress, color: "#FFEEAD" },
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
          <Text style={{fontSize:10}}>(
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
          )</Text>
          </View>
          <View style={{ backgroundColor:"#F7F7F7",width: "30%", height: 100, borderRadius: 50, margin: 10, borderWidth: 1, borderColor: "#F9D949", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:'black',}}>{userAnxiety}</Text>
          <Text style={{color:'black',}}>Anxiety</Text>
          <Text style={{fontSize:10}}>(
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
          )</Text>
          </View>
          <View style={{ backgroundColor:"#F7F7F7",width: "30%", height: 100, borderRadius: 50, margin: 10, borderWidth: 1, borderColor: "#F9D949", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{color:'black',}}>{userStress}</Text>
          <Text style={{color:'black',}}>Stress</Text>
          <Text style={{fontSize:10}}>(
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
          )</Text>
        </View>
        </View>
        <View style={{ width: "100%", padding: 5, flexDirection: 'row', justifyContent:"space-evenly" }}>
        <Text style={{textAlign:'center',fontSize:12,}}>The DASS-42 assessment, based on the Depression, Anxiety, and Stress Scale, evaluates your emotional state over the past week. 
            It's important to note that this assessment is not intended for diagnosing any specific mental health conditions. Instead,
             it provides insights into the extent to which your thoughts and emotions have been affecting you.
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
    backgroundColor: 'white',
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
