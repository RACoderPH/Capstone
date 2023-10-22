import React ,{useState}from 'react';
import { View, StyleSheet,ScrollView,Dimensions } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const BreathingScreen = () => {


  
  const navigation = useNavigation();

  const Breathe1 = () =>{
    //console.warn('Sign Up');

    navigation.navigate('Breathe1');
  };

  const Breathe2 = () =>{
    //console.warn('Sign Up');

    navigation.navigate('Breathe2');
  };

  const Breathe3 = () =>{
    //console.warn('Sign Up');

    navigation.navigate('Breathe3');
  };
  return (
    <ScrollView style={{marginTop:20}}>


      <Text variant='titleLarge' style={{textAlign:'center'}}>Breathing Techniques</Text>
      {/*First Breathe*/}
    <Card style={styles.SoundContainer} onPress={Breathe1} >
    <View style={styles.animationContainer}>
        <LottieView
          source={require('../../../assets/animation/breathe1.json')} // Replace with the path to your Lottie animation file
          autoPlay
          loop
          style={{ width: width,height:200 }}
        />
      </View>
    <Card.Content>
    <Text variant="titleLarge" style={{textAlign:'center',marginTop:10}}>Butterfly Hug</Text>
      <Text variant="bodyMedium"  style={{textAlign:'justify',marginTop:10}}>A butterfly hug is a therapeutic exercise that can help with anxiety, stress and feeling overwhelmed. It comes from a form of therapy referred to as Eye Movement Desensitization Reprocessing (EMDR). Think of it as a simple way to find grounding whenever you need it.</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

     {/*Second Breathe*/}
     <Card style={styles.SoundContainer} onPress={Breathe2} >
     <View style={styles.animationContainer}>
        <LottieView
          source={require('../../../assets/animation/breathe2.json')} // Replace with the path to your Lottie animation file
          autoPlay
          loop
          style={{ width: width,height:200 }}
        />
      </View>
    <Card.Content>
      <Text variant="titleLarge" style={{textAlign:'center',marginTop:10}}>Pursed Lip Breathing</Text>
      <Text variant="bodyMedium" style={{textAlign:'justify',marginTop:10}}>Pursed lip breathing is a breathing exercise that helps you slow your breathing and inhale and exhale more air. You slowly inhale through your nose and gently exhale through pursed lips. Pursed lip breathing makes it easier to perform physical activities and reduces stress.</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

     {/*Third Breathe*/}
     <Card style={styles.SoundContainer} onPress={Breathe3} >
     <View style={styles.animationContainer}>
        <LottieView
          source={require('../../../assets/animation/breathe3.json')} // Replace with the path to your Lottie animation file
          autoPlay
          loop
          style={{ width: width,height:200 }}
        />
      </View>
    <Card.Content>
  
      <Text variant="titleLarge" style={{textAlign:'center',marginTop:10}}>Resonant Breatthing</Text>
      <Text variant="bodyMedium"  style={{textAlign:'justify',marginTop:10}}>Resonant breathing, also known as coherent breathing or paced breathing, is a breathing technique that involves consciously controlling the rhythm and depth of your breath to achieve a state of balance and relaxation. The term "resonant" refers to the idea that this type of breathing can create a resonance or synchronization between your heart rate and your breath rate, which can have a calming effect on your nervous system.</Text>
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
