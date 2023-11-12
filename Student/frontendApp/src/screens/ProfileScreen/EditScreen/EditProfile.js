import { View, Text,
  StyleSheet ,
  Dimensions,
  Image,  
  Alert,
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
    RefreshControl,} from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import ImagePicker ,{launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { storage, store } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import avatar from '../../../../assets/images/avatar.png'

const { width, height } = Dimensions.get('window');

const EditProfile = () => {

  const [fullname, setfullname] = useState('');
  const [username, setUsername] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setphone] = useState('');
  const [stud_no, setStud] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [grade,setGrade] = useState('');
  const [section,setSection] = useState('');

  const navigation = useNavigation();
  
  const [refreshing, setRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isLoading, setIsLoading] = useState(false); 

  const [galleryPhoto, setGalleryPhoto] = useState();
  let options = {
    mediaType: 'mixed', // Allow all media types
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };
  
  //Upload Images
  const selectImage = async () => {
      const result = await launchImageLibrary(options);
      setGalleryPhoto(result.assets[0].uri);
      Alert.alert(
        'Update Images',
        'Are you sure you want to update you Profile?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => Upload(),
          },
        ],
        { cancelable: false }
      );
  }

  const Upload = async () => {
    setIsLoading(true); // Show the activity indicator

    if (galleryPhoto) {
      const imagePath = `profileImages/${userId}/${galleryPhoto.fileName}`;
      const storageRef = ref(storage, imagePath);
  
      try {
        const response = await fetch(galleryPhoto);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob);
  
        uploadTask.on("state_changed", (snapshot) => {
          // Calculate the progress percentage and update the state
          const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercentage);
        }, (error) => {
          console.error("Error uploading image: ", error);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .put(`https://mindmatters-ejmd.onrender.com/Upload/${userId}`, { image: downloadURL })
              .then((res) => {
                setIsLoading(false); // Hide the activity indicator
                console.log(res);
              })
              .catch((err) => console.log(err));
            alert('Image uploaded successfully');
            // Reload your data or update the UI as needed
          });
        });
      } catch (error) {
        console.error("Error while processing the image: ", error);
      }
    } else {
      setIsLoading(false); // Hide the activity indicator
      alert('No file selected or userData.image_file is null');
    }
  };


  
const retrieveData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      setUserId(storedId);
      setRefreshing(true); // Set refreshing to true when data retrieval starts
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${storedId}`);
      setUserData(response.data);
      setEmail(response.data.Email);
      setStud(response.data.stud_no);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false); // Set refreshing to false when data retrieval is complete
    }
  };


  const onRefresh = () => {
    retrieveData(); // Call retrieveData to initiate the data fetch
  };
 useEffect(() => {
    retrieveData();
  }, []);
const handleUpdate = () => {
  
  // Make your axios PUT request here
  axios
    .put(`https://mindmatters-ejmd.onrender.com/userUpdate/${userId}`,{
      fullname: fullname,
      username: username,
      address:address,
      phone:phone,
      email:email,
      stud_no:stud_no,
      grade:grade,
      section:section,
    })
    .then((res) => {
      Alert.alert(
        'Confirm Update',
        'Successfully Updated',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Homes'),
          },
        ],
        { cancelable: false }
      );
    })
    .catch((err) => console.log(err));
};


const confirmUpdate = () =>
 {
  if (fullname.trim() === '' || username.trim() === '' || address.trim() === '' || phone.trim() === '' || grade.trim() === '' || section.trim() === '') {
    Alert.alert('Blank Field', 'Please fill out all fields');
  } else {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleUpdate(),
        },
      ],
      { cancelable: false }
    );
  }
}



  return (
    
    <KeyboardAvoidingView style={styles.main} behavior="padding" enabled >
    <ScrollView contentContainerStyle={styles.scrollViewContent}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
  <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', fontWeight: '500' }}>User Information</Text>
  <TouchableOpacity onPress={selectImage}>
  <View style={styles.imageContainer}>
  <Text style={styles.centeredText}>Change Profile</Text>
  <Image
  source={userData && userData.image_file ? { uri: userData.image_file } : require('../../../../assets/images/avatar.png')}
  resizeMode="contain"
  style={styles.image}
/>
</View>
  </TouchableOpacity>
  <Text style={{ color: 'black', fontSize: 22, textAlign: 'center', fontWeight: '700' }}>{userData ? userData.stud_no : 'Loading...'}</Text>
</View>

    <TextInput style={{backgroundColor:'white',margin:8}}
      label="Full name"
      onChangeText={(e) => setfullname(e)}
      left={<TextInput.Icon icon="eye" />}
    />
   <TextInput style={{backgroundColor:'white',margin:8}}
      label="Username"
      onChangeText={(e) => setUsername(e)}
      left={<TextInput.Icon icon="eye" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Student Number"
      value={userData ? userData.stud_no : ''}
      left={<TextInput.Icon icon="id-card" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Address"
      onChangeText={(e) => setaddress(e)}
      left={<TextInput.Icon icon="home" />}
    />
      <TextInput style={{backgroundColor:'white',margin:8}}
      label="Email"
      value={userData ? userData.Email : ''}
      left={<TextInput.Icon icon="mail" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Contact Number"
      onChangeText={(e) => setphone(e)}
      left={<TextInput.Icon icon="mail"/>}
    />
    <View style={{ flexDirection: 'row', width: '100%',justifyContent:'center',alignItems:'center' }}>
    <TextInput style={{backgroundColor:'white',width:150}}
      label="Grade lvl"
      onChangeText={(e) => setGrade(e)}
     
    />
     <TextInput style={{backgroundColor:'white',margin:5,width:150}}
      label="Section"
      onChangeText={(e) => setSection(e)}
    
    />
    </View>

      <TouchableOpacity onPress={confirmUpdate}>
        <CustomButton text={"Submit"} style={{ margin: 8, borderRadius: 5 }} />
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  main: {
    width:width,
    height:height,// Ensure the ScrollView takes up the entire screen
    backgroundColor: 'white',
  },
  scrollViewContent: {// Allow content to grow within the ScrollView
  },
  container: {
    width: width * 1,
    margin: width * 0.03,
    alignItems: 'center',
  },
  imageContainer: {
    width: width / 2,
    height: height / 4,
    borderRadius: width / 2,
    margin: 15,
    borderWidth: 2,
    borderColor: 'black',
    position: 'relative',
    opacity: 0.5,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  centeredText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -width / 6 }, { translateY: -height / 50 }],
    fontSize: 16,
    color: 'black',
    fontWeight: '800',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: width / 2,
  },
})
export default EditProfile