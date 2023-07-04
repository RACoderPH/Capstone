import { View, Text ,StyleSheet,Image,ScrollView,Dimensions,ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react';
import bg from '../../../assets/images/exercise.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const DashBoardScreen = () => {
 
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

  return (
    <ScrollView style={styles.main}>
      <View style={styles.Topnav}>
    <View style={{ flexDirection: 'row', width: '100%', alignItems:'center'}}>
      <Text style={{ marginLeft:'4%',fontSize:16,color:'black',fontWeight:'600' }}>Hello {username}</Text>
      <Image source={bg} resizeMode="contain" style={styles.image} />
    </View>
  </View>
        <View style={styles.Container}>
        </View>
        <Text style={{fontSize:16,fontWeight:'700',color:'black',marginLeft: '2%',marginTop:'4%'}}>Features </Text>
        <Text style={{marginLeft: '2%',color:'#6B7280'}}>Let me help you to reduce your stress</Text>
        <View style={{ flexDirection: 'row',alignSelf:'center',width:'100%',justifyContent:'center'}}>
                <View style={styles.box}>
                <Icon name="newspaper" color={"#555555"} size={150}  style={{alignSelf:'center'}}/>
                <Text style={{fontSize:16,fontWeight:'700',color:'black', marginLeft: 10,marginTop:20,}}>Journal</Text>
                <Text style={{marginLeft: '5%',color:'black'}}>Write your thoughts/feelings</Text>
                </View>
                <View style={styles.box}>
                <Icon name="journal" color={"#555555"} size={150}  style={{alignSelf:'center'}}/>
                <Text style={{fontSize:16,fontWeight:'700',color:'black', marginLeft: 10,marginTop:20,}}>Assessment</Text>
                <Text style={{marginLeft: '5%',color:'black'}}>Take Assessment</Text>
               </View>
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
    Topnav:{
        width:'100%',
        padding:2,
    },
        image: {
            marginLeft:'60%',
            backgroundColor: 'gray',
            width: 40,
            height: 40,
            borderRadius:20,
            margin: 5,
        },
        Container:{
            backgroundColor: 'rgba(255, 159, 6, 0.8)',
            width: width * 0.9,
            height: height * 0.22,
            borderRadius:15,
            padding:2,
            alignSelf:'center',
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
        elevation: 2,
      },
      
        boxImage:{
            alignSelf:'center',
            width:83,
            height:83,
        }
})
export default DashBoardScreen