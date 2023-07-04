import { View, Text,StyleSheet,Image,ScrollView ,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/images/User.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';



const ProfileScreen = () => {
    //Retrieving Usernmae from Async
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

     useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`http://192.168.1.83:5000/user/${userId}`);
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
    //Logout Btn with database
    const logout = async () => {
        try {
          const userId = await AsyncStorage.getItem('id'); // Get the user ID from AsyncStorage
      
          // Make a request to the backend to update the status
          const response = await axios.post('http://192.168.1.83:5000/logout', { userId });
      
          if (response.status === 200) {
            await AsyncStorage.clear();
            navigation.navigate('SignIn');
            console.log("Logout Properly");
          } else {
            console.error('Failed to update status:', response.status);
            // Handle the error case accordingly
          }
        } catch (error) {
          console.error('Failed to update status:', error);
          // Handle the error case accordingly
        }
      };

  return (
    <ScrollView contentContainerStyle={styles.main} 
    showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}>
    <View style={styles.Image}>
      <Text style={styles.txt}>Account Setting</Text>
      <Image source={Logo} resizeMode="contain" style={styles.image} />
      <Text style={styles.username}>{userData ? userData.user_name : 'Loading...'}</Text>
    </View>
    <View style={styles.textcontainer}>
      <Text style={styles.info}>Personal Information</Text>
      <Text style={styles.value}>Value</Text>
      <View style={styles.line} />
      <Text style={styles.info}>Student Number</Text>
      <Text style={styles.value}>{userData ? userData.stud_no : 'Loading...'}</Text>
      <View style={styles.line} />
      <Text style={styles.info}>Email Address</Text>
      <Text style={styles.value}>{userData ? userData.Email : 'Loading...'}</Text>
      <View style={styles.line} />
      <Text style={styles.info}>Contact Number</Text>
      <Text style={styles.value}>Value</Text>
      <View style={styles.line} />
      <Text style={styles.info}>Guardian Name</Text>
      <Text style={styles.value}>Value</Text>
      <View style={styles.line} />
      <Text style={styles.info}>Guardian Contact</Text>
      <Text style={styles.value}>Value</Text>
      <View style={styles.line} />
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',width:"100%"}}>
      <CustomButton text="Update" style={styles.btnInfo} />
      <CustomButton text="Change Password" style={styles.btnInfo} />
    </View>
    <CustomButton text="Logout" style={styles.btn} onPress={logout} />
  </ScrollView>
  
  )
}

const styles = StyleSheet.create({
    main:{
      width:"100%",
      backgroundColor:'white',
    },
    btn:{
        backgroundColor:'#EF5757',
        alignSelf:'center',
    },
    btnInfo:{
        alignSelf:'center',
        width:"45%",
        margin:4,
    },
    txt:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
        margin:10,
    },
    value:{
        fontSize:16,
        paddingLeft:10,
        color:'black'
    },
    image: {
        width: 118,
        height: 118,
        borderRadius: 60,
        padding: 5,
        margin: 5,
    },
  Image:{
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center', 
  },
  username:{
    fontSize:20,
    fontWeight:'800',
    color:'black',
  },
  textcontainer:{
        marginTop:30,
  },    
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 2,
    alignItems: 'center',
  },
info:{
  fontWeight:'500',
    fontSize:20,
    margin:5,
    padding:3,
    color:'black'
} 
})

export default ProfileScreen