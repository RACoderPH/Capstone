import { View, Text,StyleSheet,Image,ScrollView ,Dimensions,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const { width, height } = Dimensions.get('window');


const ProfileScreen = () => {
    //Retrieving Usernmae from Async
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

     useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
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
          const response = await axios.post('https://mindmatters-ejmd.onrender.com/logout', { userId });
      
          if (response.status === 200) {
            await AsyncStorage.clear();
            navigation.navigate('SignIn');
            console.log("Logout Properly");
          } else {
            console.log('Failed to update status:', response.status);
            // Handle the error case accordingly
          }
        } catch (error) {
          console.log('Failed to update status:', error);
          // Handle the error case accordingly
        }
      };

      const edit = () =>{
        navigation.navigate('Edit');
      }
      const terms = () =>{
        navigation.navigate('Terms');
      }
      const about = () =>{
        navigation.navigate('About');
      }
      const result = () =>{
        navigation.navigate('Result');
      }
      const change = () =>{
        navigation.navigate('ChangePass');
      }

  return (
    <ScrollView contentContainerStyle={styles.main} 
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}>
      
        <View style={styles.Image}>
          <Text style={{fontSize:21,textAlign:'center',fontWeight:'300',color:'black',margin:5}}>Profile</Text>
          <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode="contain" style={styles.image} />
          <Text style={styles.username}>{userData ? userData.Fullname : 'Loading...'}</Text>
          <Text style={styles.stud_no}>{userData ? userData.stud_no : 'Loading...'}</Text>
      </View>
     <TouchableOpacity onPress={edit} ><CustomButton text="Edit Profile" style={styles.btn}/></TouchableOpacity> 
      <View style={styles.line} />
      <View style={styles.information}> 

      <TouchableOpacity onPress={result}>
      <Text style={{fontSize:18,fontWeight:'300',color:'black',margin:15}}><Icon name="document-outline" style={styles.icons}></Icon>  View Result </Text>
      <View style={styles.line} />
      </TouchableOpacity>

      <TouchableOpacity onPress={change}>
      <Text style={{fontSize:18,fontWeight:'300',color:'black',margin:15}}><Icon name="lock-closed-outline" style={styles.icons}></Icon>  Change Password</Text>
      <View style={styles.line} />
      </TouchableOpacity>

      <TouchableOpacity onPress={terms}>
      <Text style={{fontSize:18,fontWeight:'300',color:'black',margin:15}}><Icon name="newspaper-outline" style={styles.icons}></Icon>  Terms and Condition</Text>
      <View style={styles.line} />
      </TouchableOpacity>

      <TouchableOpacity onPress={about}>
      <Text style={{fontSize:18,fontWeight:'300',color:'black',margin:15}}><Icon name="information-circle-outline" style={styles.icons}></Icon> About</Text>
      <View style={styles.line} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={logout}>
      <Text style={{fontSize:18,fontWeight:'300',color:'black',margin:15}}><Icon name="log-out-outline" style={styles.icons} ></Icon>  Logout</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  
  )
}

const styles = StyleSheet.create({
    main:{
      width:width * 1,
      height:height * 1,
      backgroundColor:'white',
    },
    
    icons:{
      fontSize:25,
    },
    btn:{
        width:"45%",
        backgroundColor:'#F7D060',
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
    margin:5,
    fontSize:22,
    fontWeight:'400',
    color:'black',
  },
  stud_no:{
    margin:5,
    fontSize:21,
    fontWeight:'500',
    color:'black',
  },
  textcontainer:{
        marginTop:30,
  },    
  line: {
    marginLeft:20,
    marginRight:20,
    height: 0.5,
    fontWeight:'100',
    backgroundColor: 'gray',
    marginTop: 2,
    alignItems: 'center',
  },
info:{
  fontWeight:'500',
    fontSize:20,
    margin:5,
    padding:3,
    color:'black'
} ,
information:{
  margin:20,
}
})

export default ProfileScreen