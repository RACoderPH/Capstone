import { View, Text, StyleSheet, Dimensions, useEffect, useState } from 'react-native';
import React from 'react';
import { Avatar, Button, Card } from 'react-native-paper';
import axios from 'axios'; // Import Axios

const { width, height } = Dimensions.get('window');

const NotificationScreen = () => {
  const [announcementData, setAnnouncementData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch the data
    axios
      .get('https://mindmatters-ejmd.onrender.com/announcement') // Replace with your actual API URL
      .then((response) => {
        // Handle successful response
        setAnnouncementData(response.data); // Store the data in your component state
      })
      .catch((error) => {
        // Handle error
        console.error('Failed to fetch announcement data:', error);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <View style={styles.main}>
      {announcementData.map((announcement, index) => (
        <Card key={index}>
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
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default NotificationScreen;
