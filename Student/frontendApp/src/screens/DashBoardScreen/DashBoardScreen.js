import { View ,StyleSheet,Image,ScrollView,Dimensions,ToastAndroid,ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react';
import bg from '../../../assets/images/exercise.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar, Card, Text, Avatar, Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
//Screen route
const { width, height } = Dimensions.get('window');


const DashBoardScreen = () => {
  const navigation = useNavigation();
    const [username, setUsername] = useState('');
    useEffect(() => {
      retrieveData();
    }, []);
    
    const retrieveData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('username');
          setUsername(storedUser)
      } catch (error) {
        console.log(error);
      }
    };
    const Journal = () =>{
      //console.warn('Sign Up');

      navigation.navigate('Journal');
    };
   
    const Assessment = () =>{
      //console.warn('Sign Up');
      ToastAndroid.show('Test',ToastAndroid.SHORT);
    };

    const MyComponent = () => {
      return (
        <Card style={styles.content} onPress={Journal}>
          <Card.Title title="Journal"/>
          <Card.Cover source={{ uri:'https://picsum.photos/200'}}  style={styles.cover}/>
          <Card.Content>
            <Text style={{fontSize:12}}>Write your thoughts/{'\n'}feeling</Text>
          </Card.Content>
        </Card>
      );
    };

    const MyComponent2 = () => {
      return (
        <Card style={styles.content} onPress={Assessment}>
          <Card.Title title="Assessment"/>
          <Card.Cover source={{ uri:'https://picsum.photos/300'}}  style={styles.cover}/>
          <Card.Content>
            <Text style={{fontSize:13}}>Let test your Mind</Text>
          </Card.Content>
        </Card>
    
        
      );
    };

    
    const Dash = () => {
      return (
        <Card style={styles.firstbox}>
     
        </Card>
    
        
      );
    };

    
  return (
    <ScrollView style={styles.main}>
      <View style={styles.Topnav}>
    <View style={{ flexDirection: 'row', width: '100%', alignItems:'center'}}>
      <Text style={{ marginLeft:'4%',fontSize:16,color:'black',fontWeight:'600' }}>Hello <Text style={{ fontWeight: 'bold' }}>{username}</Text>
      </Text>
      <Image source={bg} resizeMode="contain" style={styles.image}/>
    </View>
  </View>
        <Dash />
        <Text style={{fontSize:16,fontWeight:'700',color:'black',marginLeft: '2%',marginTop:'4%'}}>Features </Text>
        <Text style={{marginLeft: '2%',color:'#6B7280'}}>Let me help you to reduce your stress</Text>
        <View style={{ flexDirection: 'row',alignSelf:'center'}}>
          
                <MyComponent/>
                <MyComponent2/>
                
        </View>
        <Text style={{fontSize:16,fontWeight:'700',color:'black', marginLeft: '2%',marginTop:'4%'}}>Tools</Text>
        <Text style={{marginLeft: '2%',color:'#6B7280'}}>Release your Tension</Text>
        <View style={styles.Container2}>
        <ImageBackground source={bg} style={styles.backgroundImage}>
          <Text style={{color:'#574848',fontSize:20,fontWeight:'700',margin:15}}>Breathe</Text>
          <Text style={{color:'white',fontSize:18, marginLeft:10}}>A breathing exercise for reducing stress {'\n'}& anxiety</Text>
      </ImageBackground>

        </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    main:{
      width:'100%',
      backgroundColor:'white',
      height:'100%',
    },
    cover:{
      width:150,
      height:150,
    },
    content:{
      padding:10,
      marginBottom:1,
      margin:4
  },
  firstbox:{
    height:200,
    width:"90%",
    alignSelf:'center'
  },
    Topnav:{
        width:'100%',
        padding:2,
    },
        image: {
            marginLeft:'55%',
            backgroundColor: 'gray',
            width: 40,
            height: 40,
            borderRadius:20,
            margin: 5,
        },

        Container2: {
          marginBottom: 15,
          marginTop: 5,
          width: width * 0.95,
          height: height * 0.22,
          borderRadius: 15,
          padding: 2,
          alignSelf: 'center',
        },
        backgroundImage: {
          flex: 1,
          resizeMode: 'cover',
          borderRadius: 15,
        },
      box: {
        width: '45%',
        height: '100%',
        margin: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffff',
        elevation: 1,
      },
      
        boxImage:{
            alignSelf:'center',
            width:83,
            height:83,
        }
})
export default DashBoardScreen