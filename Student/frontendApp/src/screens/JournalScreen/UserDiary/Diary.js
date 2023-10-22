import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Text, BackHandler } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const Diary = () => {
  const navigation = useNavigation();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: width - 40, // Reduce the width to create space on both sides
    borderRadius: 10,
    marginLeft: 'auto', // Push the modal to the center of the screen
    marginRight: 'auto', // Push the modal to the center of the screen
  };

  const showModal = (entry) => {
    setSelectedEntry(entry);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedEntry(null);
    setVisible(false);
  };

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const userId = await AsyncStorage.getItem('id');
      axios
        .get(`https://mindmatters-ejmd.onrender.com/MyDiary/${userId}`)
        .then((response) => {
          setDiaryEntries(response.data);
        })
        .catch((error) => {
          console.error('Error fetching diary entries:', error);
        });
    };

    fetchDiaryEntries();

    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const MyComponent = ({ entry }) => (
    <TouchableOpacity onPress={() => showModal(entry)}>
      <View style={styles.componentContainer}>
        <Card style={styles.entryCard}>
          <Card.Content>
            <Text style={styles.entryTitle}>{entry.title}</Text>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );

  const MyComponent2 = () => (
    <View style={styles.componentContainer}>
      <Card style={styles.entryCard}>
        <Card.Content>
          <Icon name="add-outline" style={styles.addIcon} />
        </Card.Content>
      </Card>
    </View>
  );

  const Add = () => {
    navigation.navigate('UserDiary');
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.pageTitle}>My Diary</Text>
          {diaryEntries.map((entry) => (
            <MyComponent key={entry.diary_id} entry={entry} />
          ))}
          <TouchableOpacity onPress={Add}>
            <MyComponent2 />
          </TouchableOpacity>
        </ScrollView>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            {selectedEntry && (
              <View style={styles.modalContainer}>
                <View style={styles.titleBox} contentContainerStyle={styles.scrollContent}>
                  <Text style={styles.titleText}>Title: {selectedEntry.title}</Text>
                </View>
                <ScrollView style={styles.contentBox} contentContainerStyle={styles.scrollContent}>
                  <Text style={styles.contentText}>Content: {selectedEntry.description}</Text>
                </ScrollView>
                {/* Include other properties of the entry as needed */}
              </View>
            )}
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
     width:width,
    height:height,
    backgroundColor: 'white',// Light yellow background
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  componentContainer: {
    marginBottom: 15,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
  },
  addIcon: {
    fontSize: 30,
    color: 'black',
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 36, // Adjust the font size as needed
    color: 'black', // Text color
    marginBottom: 20, // Add some space below the title
    textAlign: 'center', // Center the text
    textTransform: 'uppercase', // You can apply text transformations if desired
    // You can also add text shadow, background color, and other styles for an aesthetic look
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleBox: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  contentBox: {
    backgroundColor: 'white',
    width: '100%',
    maxHeight: 400,
    borderRadius: 5,
    padding: 10,
  },
  scrollContent: {
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  contentText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Diary;
