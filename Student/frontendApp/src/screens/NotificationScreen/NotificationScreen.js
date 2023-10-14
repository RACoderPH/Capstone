import { View, Text, StyleSheet, Dimensions,ScrollView} from 'react-native';
import React , {useState,useEffect} from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import axios from 'axios'; // Import Axios

const { width, height } = Dimensions.get('window');

const NotificationScreen = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch the data
    axios
      .get('https://mindmatters-ejmd.onrender.com/announcement') // Replace with your actual API URL
      .then((response) => {
        // Handle successful response
        setData(response.data); // Store the data in your component state
      })
      .catch((error) => {
        // Handle error
        console.error('Failed to fetch announcement data:', error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <ScrollView style={styles.main}>
      <View style={styles.textBox}>
      <Text style={styles.txt}>Announcement</Text>
      </View>
      <View style={{paddingBottom:50}}>
    {Data.map((announcement, index) => (
      <View key={index}  style={styles.Box}>
      <Card>
        <Card.Title title={announcement.title} />
        <Card.Content>
          <Text variant="titleLarge">What</Text>
          <Text variant="bodyMedium">{announcement.what_announce}</Text>
          <Text variant="titleLarge">Where</Text>
          <Text variant="bodyMedium">{announcement.where_announce}</Text>
          <Text variant="titleLarge">When</Text>
          <Text variant="bodyMedium">{announcement.when_announce}</Text>
        </Card.Content>
        <Card.Actions>
          <Button>View</Button>
        </Card.Actions>
      </Card>
      </View>

    ))}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width:width,
    height:height,
  },
  Box:{
    width:'100%',
    padding:5,
  },
  textBox:{
    width:'100%',
    margin:10,
    alignItems:'center'
  },
  txt:{
    fontSize:20,
    color:'black',
    fontWeight:'600'
  }
});

export default NotificationScreen;
