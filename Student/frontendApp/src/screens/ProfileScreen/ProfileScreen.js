import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  // Define the retrieveData function
  const retrieveData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('id');
      setUserId(storedId);
      setRefreshing(true); // Set refreshing to true when data retrieval starts
      const response = await axios.get(`https://mindmatters-ejmd.onrender.com/user/${storedId}`);
      setUserData(response.data);
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
  // Logout Btn with database
  const logout = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const response = await axios.post('https://mindmatters-ejmd.onrender.com/logout', { userId });

      if (response.status === 200) {
        await AsyncStorage.clear();
        navigation.navigate('SignIn');
        console.log('Logout Properly');
      } else {
        console.log('Failed to update status:', response.status);
        // Handle the error case accordingly
      }
    } catch (error) {
      console.log('Failed to update status:', error);
      // Handle the error case accordingly
    }
  };

  const edit = () => {
    navigation.navigate('Edit');
  };

  const terms = () => {
    navigation.navigate('Terms');
  };

  const about = () => {
    navigation.navigate('About');
  };

  const result = () => {
    navigation.navigate('ProfileResult');
  };

  const change = () => {
    navigation.navigate('ChangePass');
  };

  const Verify = () => {
    navigation.navigate('verified');
  }

  const Delete = () => { 
    navigation.navigate('Delete');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.Image}>
        <Text style={{ fontSize: 21, textAlign: 'center', fontWeight: '300', color: 'black', margin: 5 }}>Account Profile</Text>
        <Image
  source={userData && userData.image_file ? { uri: userData.image_file } : require('../../../assets/images/avatar.png')}
  resizeMode="contain"
  style={styles.image}
/>
        <Text style={styles.username}>{userData ? userData.Fullname : 'Loading..'}</Text>
        <Text style={styles.stud_no}>{userData ? userData.stud_no : 'Loading..'}</Text>
      </View>

      <TouchableOpacity onPress={edit}><CustomButton text="Edit Profile" style={styles.btn} /></TouchableOpacity>
      <View style={{ width: '100%', alignItems: 'center' }}>
  {userData?.attachment ? (
    <TouchableOpacity onPress={Verify}>
      <Text style={styles.link2}>Verify: Pending</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={Verify}>
      <Text style={styles.link}>Verify your account</Text>
    </TouchableOpacity>
  )}

  {userData?.attachment ? (
    <Text>
      Status: {(() => {
        switch (userData.Verified) {
          case 1:
            return <Text style={styles.verifiedStatus}>Verified</Text>;
          case 2:
            return (
              <TouchableOpacity onPress={Verify}>
                <Text style={styles.notVerifiedLink}>Not Verified</Text>
              </TouchableOpacity>
            );
          case 0:
            return 'Pending';
          default:
            return 'Unknown';
        }
      })()}
    </Text>
  ) : null}
</View>

      <View style={styles.line} />
      <View style={styles.information}>
      <View style={styles.container}>
  <Text style={styles.pageTitle}>Personal Information</Text>
  <Text style={styles.userInfoText}>Username: {userData ? userData.user_name : 'Loading..'}</Text>
  <Text style={styles.userInfoText}>Phone Number: {userData ? userData.phone_number : 'null'}</Text>
  <Text style={styles.userInfoText}>Address: {userData ? userData.address : 'null'} </Text>
  <Text style={styles.userInfoText}>Grade & Section: {userData ? userData.gradelvl : 'null'} - {userData ? userData.section : 'null'} </Text>
</View>

        <TouchableOpacity onPress={result}>
          <Text style={{ fontSize: 18, fontWeight: '300', color: 'black', margin: 15 }}>
            <Icon name="document-outline" style={styles.icons} />
            View Result
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity onPress={change}>
          <Text style={{ fontSize: 18, fontWeight: '300', color: 'black', margin: 15 }}>
            <Icon name="lock-closed-outline" style={styles.icons} />
            Change Password
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity onPress={terms}>
          <Text style={{ fontSize: 18, fontWeight: '300', color: 'black', margin: 15 }}>
            <Icon name="newspaper-outline" style={styles.icons} />
            Terms and Condition
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity onPress={about}>
          <Text style={{ fontSize: 18, fontWeight: '300', color: 'black', margin: 15 }}>
            <Icon name="information-circle-outline" style={styles.icons} />
            About
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Delete}>
          <Text style={{ fontSize: 18, fontWeight: '300', color: '#E25E3E', margin: 15 }}>
            <Icon name="person-outline" style={styles.icons} />
            Account Delete
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={{ fontSize: 18, fontWeight: '300', color: 'black', margin: 15 }}>
            <Icon name="log-out-outline" style={styles.icons} />
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1, 
    backgroundColor: 'white',
  },
  icons: {
    fontSize: 25,
  },
  btn: {
    width: '45%',
    backgroundColor: '#F7D060',
    alignSelf: 'center',
  },
  btnInfo: {
    alignSelf: 'center',
    width: '45%',
    margin: 4,
  },
  txt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
  Txtinfo:{
    fontSize:16,
    fontWeight:'400'
  },
  value: {
    fontSize: 16,
    paddingLeft: 10,
    color: 'black',
  },
  image: {
    width: 118,
    height: 118,
    borderRadius: 60,
    padding: 5,
    margin: 5,
    borderWidth:1,
    borderColor:'gray',
  },
  Image: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    margin: 5,
    fontSize: 22,
    fontWeight: '400',
    color: 'black',
  },
  stud_no: {
    margin: 5,
    fontSize: 21,
    fontWeight: '500',
    color: 'black',
  },
  textcontainer: {
    marginTop: 30,
  },
  line: {
    marginLeft: 20,
    marginRight: 20,
    height: 1,
    fontWeight: '100',
    backgroundColor: 'gray',
    marginTop: 2,
    alignItems: 'center',
  },
  info: {
    fontWeight: '500',
    fontSize: 20,
    margin: 5,
    padding: 3,
    color: 'black',
  },
  information: {
    margin: 20,
    height:'100%'
  },
  link: {
    fontSize:18,
    color: 'blue',
  },
  link2: {
    fontSize:18,
    color: 'blue',
    textDecorationLine: 'underline',
    display:'none'
  },
  verifiedStatus: {
    fontSize:18,
    color: 'green', // Green color for verified status
  },
  notVerifiedLink: {
    fontSize: 18,
    color: 'red', // Red color for not verified link
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black', // Title text color
    textTransform: 'uppercase',
  },
  userInfoText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    color: 'black', // User info text color
  },
});

export default ProfileScreen;
