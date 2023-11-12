import React, { useState, useEffect } from 'react';
import { View,
   StyleSheet, 
   ScrollView,
   Dimensions,
    TouchableOpacity,
   Text,
    BackHandler,
     ActivityIndicator,
     Alert ,
     TextInput,
     RefreshControl,} from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Provider ,IconButton} from 'react-native-paper';
import CustomButton from '../../../components/CustomButton/CustomButton';
const { width, height } = Dimensions.get('window');

const apiUrl = 'https://mindmatters-ejmd.onrender.com';

const Diary = () => {
  const navigation = useNavigation();
  const [diaryEntries, setDiaryEntries] = useState([]);

  const [visible, setVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

const [editVisible, setEditVisible] = useState(false);
const [editEntry, setEditEntry] = useState(null);


  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: width - 40, // Reduce the width to create space on both sides
    borderRadius: 10,
    marginLeft: 'auto', // Push the modal to the center of the screen
    marginRight: 'auto', // Push the modal to the center of the screen
  };

  //Viewing Diary
  const showModal = (entry) => {
    setSelectedEntry(entry);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedEntry(null);
    setVisible(false);
  };

//Editing Diary
  const showEditModal = (entry) => {
    // Initialize editEntry with the selected entry
    setEditEntry(entry);
    setEditVisible(true);
  };
  
  const hideEditModal = () => {
    setEditEntry(null);
    setEditVisible(false);
  };
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  
  const onRefresh = () => {
    fetchDiaryEntries();
  };

  useEffect(() => {

    fetchDiaryEntries();

    const backAction = () => {
      navigation.navigate('Homes');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);


  const handleDeleteEntry = (diaryId) => {
    // Show a confirmation alert
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this diary entry?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            // User canceled the deletion, do nothing
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // User confirmed the deletion, proceed with deletion
            setIsLoading(true);
  
            axios
              .delete(`https://mindmatters-ejmd.onrender.com/DeleteDiary/${diaryId}`)
              .then((response) => {
                setIsLoading(false);
                // Check if the request was successful
                if (response.status === 200) {
                  // Remove the deleted entry from the state
                  setDiaryEntries((prevEntries) => prevEntries.filter((entry) => entry.diary_id !== diaryId));
                  console.log('Diary entry deleted successfully', response.data.message);
                } else {
                  console.error('Failed to delete diary entry');
                }
              })
              .catch((error) => {
                console.error(error);
                setIsLoading(false);
              });
          },
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside of it
    );
  };
  
  const handleEditEntry = (diaryId, updatedTitle, updatedDescription) => {
    // Define the data you want to send to the server
    const data = {
      title: updatedTitle, // Pass the updated title
      description: updatedDescription, // Pass the updated description
    };
  
    setIsLoading(true);
    hideEditModal();
  
    // Send a PUT request to update the diary entry with data in the request body
    axios.put(`https://mindmatters-ejmd.onrender.com/EditDiary/${diaryId}`, data)
      .then(response => {
        setIsLoading(false);
        hideEditModal();
        // Update was successful, handle the response
        console.log('Diary entry updated successfully:', response.data);
        // You can also perform other actions here, e.g., update your local state or UI
      })
      .catch(error => {
        setIsLoading(false);
        hideEditModal();
        // Handle the error, e.g., display an error message to the user
        console.error('Failed to update diary entry:', error);
        // You can also perform error handling or display an error message to the user
      });
  };

  //To be fetch
  const fetchDiaryEntries = async () => {
    setIsLoading(true);
    const userId = await AsyncStorage.getItem('id');
    axios
      .get(`${apiUrl}/MyDiary/${userId}`)
      .then((response) => {
        setIsLoading(false);
        setDiaryEntries(response.data);
       
      })
      .catch((error) => {
        console.error('Error fetching diary entries:', error);
      });
  };


  //Component
  const MyComponent = ({ entry }) => {
    // Function to format the date to year-month-day
    return (
      <TouchableOpacity onPress={() => showModal(entry)}>
        <View style={styles.componentContainer}>
          <Card style={styles.entryCard}>
            <View style={styles.iconContainer}>
             
              {/* Edit Icon */}
              <IconButton
                icon="pencil"
                color="blue"
                size={20}
                onPress={() => showEditModal(entry)} // Replace with your edit function
              />
              {/* Delete Icon */}
              <IconButton
                icon="delete"
                color="red"
                size={20}
                onPress={() => handleDeleteEntry(entry.diary_id)} // Replace with your delete function
              />
            </View>
            <Card.Content>
              <Text style={styles.entryTitle}>{entry.title}</Text>
            </Card.Content>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };
  

  const MyComponent2 = () => (
    <View style={styles.componentContainer2}>
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
    <Provider >
        {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: width,
            height: height,
            justifyContent: 'center',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparent background
          }}
        >
          <ActivityIndicator
            size="large"
            color="#FBD148"
            style={{ marginTop: 20 }}
          />
        </View>
      )}
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>My Diary</Text>
        </View>
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
                  <Text style={styles.titleText}>
        {formatDate(selectedEntry.date)}
      </Text>
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



        {/** EDIT MODAL*/}
        <Portal>
        <Modal visible={editVisible} onDismiss={hideEditModal} contentContainerStyle={containerStyle}>
  {editEntry && (
    <View style={styles.modalContainer}>
      {/* Create a form or input fields for editing the diary entry */}
      {/* For example, input fields for title and description */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Title"
          style={styles.input} 
          value={editEntry.title}
          placeholder='Title'
          onChangeText={(text) => setEditEntry({ ...editEntry, title: text })} // Update editEntry.title
          multiline
        />
        <ScrollView style={{ maxHeight: 200 }}>
          <TextInput
            label="Description"
            style={styles.input}
            value={editEntry.description}
            placeholder='Description'
            onChangeText={(text) => setEditEntry({ ...editEntry, description: text })} // Update editEntry.description
            multiline
          />
        </ScrollView>
      </View>
      {/* Add Save and Cancel buttons for editing */}
      <TouchableOpacity onPress={() => handleEditEntry(editEntry.diary_id, editEntry.title, editEntry.description)}>
        <CustomButton text="Edit" style={{ width: 200 }} />
      </TouchableOpacity>
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
  componentContainer2: {
    marginBottom: 25,
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
  titleContainer: {
    padding: 10, // Add padding to create space around the text
    borderRadius: 10,
    marginTop:20,
    marginBottom:20, // Add border radius to round the corners
  },
  pageTitle: {
    fontSize: 36,
    fontFamily: 'Georgia', // Replace with your chosen font 
    textAlign: 'center', // Center-align the text
    textTransform: 'uppercase', // Transform text to uppercase
    letterSpacing: 1, // Adjust letter spacing
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  contentText: {
    fontSize: 16,
    color: 'black',
  },
  iconContainer:{
    flexDirection:'row',
    justifyContent: 'flex-end'
  },
  input: {
    width: '100%',
    minHeight: 30,
    margin: 10,
    borderBottomWidth:1,
  },
  inputContainer:{
    padding:10,
    margin:10,
    width:'100%',
  }
});

export default Diary;
