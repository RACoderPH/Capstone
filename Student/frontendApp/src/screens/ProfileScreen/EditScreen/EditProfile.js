import { View, Text,StyleSheet ,Dimensions,Image,  Alert,ScrollView, TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton/CustomButton';
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


   useEffect(() => {
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const retrieveData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      const storedUser = await AsyncStorage.getItem('username');
      setUserId(storedId);
      fetchUserData(storedId);
    } catch (error) {
      console.log(error);
    }
  };

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
    })
    .then((res) => {
      alert('Success');
      // Handle data update in your component (e.g., re-fetch data or update state)
      // ...
    })
    .catch((err) => console.log(err));
};


const confirmUpdate = () =>
 {
  if (fullname.trim() === '' || username === '' || address === '' || phone === '') {
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
    <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <Text style={{color:'black', fontSize:20,textAlign:'center',fontWeight:'500'}}>Edit Profile</Text>
      <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode="contain" style={styles.image} />
      <Text style={{color:'black', fontSize:22,textAlign:'center',fontWeight:'700'}}>{userData ? userData.stud_no : 'Loading...'}</Text>
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
      onChangeText={(e) => setStud(e)}
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
      onChangeText={(e) => setEmail(e)}
      left={<TextInput.Icon icon="mail" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Contact Number"
      onChangeText={(e) => setphone(e)}
      left={<TextInput.Icon icon="mail"/>}
    />
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
  image: {
    width: width / 3,
    height: height / 6,
    borderRadius: 30,
    margin: 15,
  },
})
export default EditProfile