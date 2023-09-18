import React ,{useState}from 'react';
import { View, StyleSheet,ScrollView,Dimensions } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const BreathingScreen = () => {


  
  const navigation = useNavigation();


  const Breathe1 = () =>{
    //console.warn('Sign Up');

    navigation.navigate('Breathe1');
  };


  const [isPlaying, setIsPlaying] = useState(false);
  const onPress = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ScrollView style={{marginTop:20}}>
      {/*First Breathe*/}
    <Card style={styles.SoundContainer} onPress={Breathe1} >
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
    <Card.Content>
    <Text variant="titleLarge" style={{textAlign:'center',marginTop:10}}>Butterfly Hug</Text>
      <Text variant="bodyMedium"  style={{textAlign:'justify',marginTop:10}}>A butterfly hug is a therapeutic exercise that can help with anxiety, stress and feeling overwhelmed. It comes from a form of therapy referred to as Eye Movement Desensitization Reprocessing (EMDR). Think of it as a simple way to find grounding whenever you need it.</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

     {/*Second Breathe*/}
     <Card style={styles.SoundContainer} onPress={Breathe1} >
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
    <Card.Content>
      <Text variant="titleLarge" style={{textAlign:'center',marginTop:10}}>Simple Breathing Exercise</Text>
      <Text variant="bodyMedium" style={{textAlign:'justify',marginTop:10}}>You can perform this simple breathing exercise as often as needed. It can be done standing up, sitting, or lying down. If you find this exercise difficult or believe it's making you anxious or panicky, stop for now.</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

     {/*Third Breathe*/}
     <Card style={styles.SoundContainer} onPress={Breathe1} >
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
    <Card.Content>
  
      <Text variant="titleLarge" style={{textAlign:'center',marginTop:10}}>Breathing Exercise</Text>
      <Text variant="bodyMedium"  style={{textAlign:'justify',marginTop:10}}>Description</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SoundContainer:{
    margin:width*0.020,
  },
});

export default BreathingScreen;
