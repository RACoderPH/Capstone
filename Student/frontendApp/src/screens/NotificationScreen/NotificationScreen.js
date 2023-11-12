import { View, Text, StyleSheet, Dimensions,ScrollView, RefreshControl} from 'react-native';
import React , {useState,useEffect} from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import axios from 'axios'; // Import Axios

const { width, height } = Dimensions.get('window');

const NotificationScreen = () => {
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
      fetchAnnouncement();
  };

  useEffect(() => {
    // Make a GET request to fetch the data
      fetchAnnouncement();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const fetchAnnouncement = () => {
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
  }

  const formatDateTime = (dateTimeStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDateTime = new Date(dateTimeStr).toLocaleString(undefined, options);
    return formattedDateTime;
  };
  
  return (
    <ScrollView style={styles.main}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{width:'100%',height:'100%'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Announcement</Text>
      </View>
      <View style={{ paddingBottom: 50 }}>
        {Data.map((announcement, index) => (
          <View key={index} style={styles.Box}>
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>{announcement.title}</Text>
              <Card.Content>
                <Text style={styles.label}>What</Text>
                <Text style={styles.text}>{announcement.what_announce}</Text>
                <Text style={styles.label}>Where</Text>
                <Text style={styles.text}>{announcement.where_announce}</Text>
                <Text style={styles.label}>When</Text>
                <Text style={styles.text}>{formatDateTime(announcement.when_announce)}</Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
    padding: 20,
  },
  Box: {
    width: '100%',
    marginBottom: 30,
  },
  textBox: {
    width: '100%',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  card: {
    elevation: 3,
  },
  cardTitle: {
    textAlign:'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFA33C', // Background color for the title container
    paddingVertical: 10,
    marginBottom:20,
    borderRadius:10,
  },
  title: {
    fontSize: 24,
    color: 'white', // Text color for the title
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
