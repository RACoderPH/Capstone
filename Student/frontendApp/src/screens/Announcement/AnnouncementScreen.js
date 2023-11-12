import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const AnnouncementScreen = () => {
  const [data, setData] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  }, []);

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.Title}>Announcement</Text>
      </View>

      {data.map((announcement, index) => (
        <TouchableOpacity key={index} onPress={() => openModal(announcement)}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Image
                source={require('../../../assets/images/exercise.jpg')}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>{announcement.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedAnnouncement && (
                <View>
                  <Text style={styles.modalTitle}>{selectedAnnouncement.title}</Text>
                  <Text style={styles.modalDescription}>
                    What: {selectedAnnouncement.what_announce}
                  </Text>

                  <Text style={styles.modalDescription}>
                    Where: {selectedAnnouncement.where_announce}
                  </Text>

                  <Text style={styles.modalDescription}>
                    When: {selectedAnnouncement.when_announce}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width,
    height: height,
  },
  container: {
    width: '100%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    fontSize: 30,
    color: 'black',
  },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 10,
    borderRadius: 1,
  },
  cardText: {
    fontSize: 18,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    textAlign:'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 20,
    color: 'black',
  },
});

export default AnnouncementScreen;
