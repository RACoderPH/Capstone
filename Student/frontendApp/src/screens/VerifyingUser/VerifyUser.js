import React, { useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import ImagePicker ,{launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { storage, store } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const VerifyUser = () => {
  const [galleryPhoto, setGalleryPhoto] = useState();
  const [userId, setUserId] = useState(null);
  const [userData,setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false); 
  const navigation = useNavigation();

  let options = {
    mediaType: 'mixed', // Allow all media types
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  };

  const selectImage = async () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setGalleryPhoto(selectedImage);
      }
    });
  }
  

  const UploadImage = async () => {
    setIsLoading(true); // Show the activity indicator

    if (galleryPhoto) {
      const imagePath = `Attachment/${userId}/${new Date().getTime()}.jpg`; // Generate a unique image path
      const storageRef = ref(storage, imagePath);

      try {
        const response = await fetch(galleryPhoto);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on("state_changed", (snapshot) => {
          // Handle upload progress if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, (error) => {
          // Handle unsuccessful uploads
          console.error('Upload error:', error);
        }, () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .put(`https://mindmatters-ejmd.onrender.com/attachment/${userId}`, { image: downloadURL })
              .then((res) => {
                setIsLoading(false); // Hide the activity indicator
                console.log(res);
              })

            console.log('File available at', downloadURL);
            alert('Image uploaded successfully');
            navigation.navigate('Homes');
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

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      setUserId(storedId);
      //setRefreshing(true); // Set refreshing to true when data retrieval starts
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${storedId}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      //setRefreshing(false); // Set refreshing to false when data retrieval is complete
    }
  };

  return (
    <View style={styles.container}>
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
    <Text style={styles.text}>
      Please attach a photo of your School ID proof that you're officially
      enrolled in St. Dominic Academy of Pulilan Inc.
    </Text>
    <TouchableOpacity onPress={selectImage}>
  {galleryPhoto || (userData && userData.attachment) ? (
    <Image
      source={{ uri: galleryPhoto || userData.attachment }}
      style={styles.image}
      resizeMode="cover"
    />
  ) : (
    <View style={styles.imagePlaceholder}>
      <Text style={styles.imagePlaceholderText}>Select Image</Text>
    </View>
  )}
</TouchableOpacity>

    <TouchableOpacity onPress={UploadImage}>
      <CustomButton text="Upload" />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 18,
    color: '#999',
  },
});

export default VerifyUser;
