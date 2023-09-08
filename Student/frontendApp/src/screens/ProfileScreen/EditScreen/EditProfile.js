import { View, Text,StyleSheet ,Dimensions,Image} from 'react-native'
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../../components/CustomButton/CustomButton';
const { width, height } = Dimensions.get('window');

const EditProfile = () => {
  
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

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

const [text, setText] = React.useState('');

  return (
    <View style={styles.main}>
         <View style={styles.container}>
      <Text style={{color:'black', fontSize:20,textAlign:'center',fontWeight:'500'}}>Edit Profile</Text>
      <Image source={{ uri: 'https://picsum.photos/700' }} resizeMode="contain" style={styles.image} />
      <Text style={{color:'black', fontSize:22,textAlign:'center',fontWeight:'700'}}>{userData ? userData.stud_no : 'Loading...'}</Text>
    </View>
    <TextInput style={{backgroundColor:'white',margin:8}}
      label="Full name"
      left={<TextInput.Icon icon="eye" />}
    />
   <TextInput style={{backgroundColor:'white',margin:8}}
      label="Username"
      left={<TextInput.Icon icon="eye" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Student Number"
      left={<TextInput.Icon icon="eye" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Address"
      left={<TextInput.Icon icon="eye" />}
    />
      <TextInput style={{backgroundColor:'white',margin:8}}
      label="Email"
      left={<TextInput.Icon icon="camera" />}
    />
     <TextInput style={{backgroundColor:'white',margin:8}}
      label="Contact Number"
      left={<TextInput.Icon icon="eye" />}
    />
    <CustomButton text={"Submit"} style={{margin:8,borderRadius:5}}/>
    </View>
  )
}
const styles = StyleSheet.create({
  main:{
    backgroundColor:'white',
    width:width * 1,
    height: height * 1,
  },
  container:{
    width:width * 1,
    margin:width * 0.03,
    alignItems:'center',
  },
   image: {
    width: width / 3 ,
    height: height / 6,
    borderRadius: 30,
    margin: 15,
},
})
export default EditProfile